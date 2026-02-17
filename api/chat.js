import OpenAI from "openai";
import fs from 'fs';
import path from 'path';

// Lazy initialize OpenAI client (ensures env vars are loaded)
let openai;
function getOpenAIClient() {
    if (!openai) {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY environment variable is not set');
        }
        openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }
    return openai;
}

// Rate limiting
let lastRequestTime = 0;
const COOLDOWN_MS = 2000;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Rate limit check
    const now = Date.now();
    if (now - lastRequestTime < COOLDOWN_MS) {
        return res.status(429).json({
            error: "Rate limit",
            message: "Please wait a moment before sending another message."
        });
    }
    lastRequestTime = now;

    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        // --- RAG: Search local data ---
        const dataDir = path.join(process.cwd(), 'data');
        let context = '';
        let sources = [];

        if (fs.existsSync(dataDir)) {
            const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && f !== 'url.json');

            for (const file of files) {
                try {
                    const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
                    const items = Array.isArray(data) ? data : (data.content || [data]);
                    const keywords = message.toLowerCase().split(' ');

                    items.forEach(item => {
                        if (typeof item !== 'object') return;
                        const text = (item.title || '') + (item.content || item.text || '');
                        if (keywords.some(k => text.toLowerCase().includes(k))) {
                            context += `\n[${item.title || file}]\n${item.content || item.text || JSON.stringify(item)}\n`;
                            sources.push({
                                type: 'local',
                                title: item.title || file,
                                url: `file:///${file}`
                            });
                        }
                    });
                } catch (e) {
                    console.error(`Error reading ${file}:`, e.message);
                }
            }
        }

        // --- Construct prompt ---
        const systemPrompt = "You are ATIO, an agricultural AI assistant. Provide helpful, accurate information about farming and food systems.";
        const userPrompt = context
            ? `Use this context to answer:\n${context}\n\nQuestion: ${message}`
            : message;

        // --- Call OpenAI using official SDK pattern ---
        console.log("Calling OpenAI API...");

        const response = await getOpenAIClient().chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            max_tokens: 1000,
            temperature: 0.7,
        });

        const text = response.choices[0].message.content;
        console.log("✓ OpenAI response received");

        return res.status(200).json({ text, sources });

    } catch (error) {
        console.error('OpenAI API Error:', error.message);

        // Handle specific OpenAI errors
        if (error.status === 429 || error.code === 'rate_limit_exceeded') {
            return res.status(429).json({
                error: "Rate limit exceeded",
                message: "Too many requests. Please wait a moment."
            });
        }

        if (error.status === 401 || error.code === 'invalid_api_key') {
            return res.status(500).json({
                error: "Configuration error",
                message: "API key is invalid. Please check your configuration."
            });
        }

        if (error.code === 'insufficient_quota') {
            return res.status(500).json({
                error: "Quota exceeded",
                message: "OpenAI quota has been exceeded. Please check your billing."
            });
        }

        // Generic error
        return res.status(500).json({
            error: 'AI Service Error',
            message: error.message || 'An unexpected error occurred.'
        });
    }
}
