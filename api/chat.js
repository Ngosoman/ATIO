import fs from 'fs';
import path from 'path';
import axios from 'axios';
import * as cheerio from 'cheerio';

// Use direct fetch instead of SDK to avoid initialization issues
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        // Step 1: Search local JSON files
        const dataDir = path.join(process.cwd(), 'data');
        let context = '';
        let sources = [];
        let localMatchFound = false;

        if (fs.existsSync(dataDir)) {
            const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));

            // Check Local JSON Files
            for (const file of files) {
                if (file === 'url.json') continue;

                const filePath = path.join(dataDir, file);
                const fileContent = fs.readFileSync(filePath, 'utf8');
                try {
                    const jsonData = JSON.parse(fileContent);
                    const keywords = message.toLowerCase().split(' ');

                    if (Array.isArray(jsonData)) {
                        jsonData.forEach(item => {
                            let score = 0;
                            keywords.forEach(word => {
                                if (item.title?.toLowerCase().includes(word)) score += 2;
                                if (item.content?.toLowerCase().includes(word)) score += 1;
                                if (item.keywords?.includes(word)) score += 3;
                            });

                            if (score > 0) {
                                localMatchFound = true;
                                context += `\n[From ${file}]\nTitle: ${item.title || 'N/A'}\nContent: ${item.content || 'N/A'}\n`;
                                sources.push({ type: 'local', title: item.title || file, url: `file:///${file}` });
                            }
                        });
                    }
                } catch (err) {
                    console.error(`Error parsing ${file}:`, err);
                }
            }
        }

        // Step 2: Generate response using OpenRouter
        let prompt;
        if (localMatchFound) {
            prompt = `You are ATIO, an AI assistant for food systems and agriculture.
            
Context from knowledge base:
${context}

User question: ${message}

Instructions:
Answer based STRICTLY on the context provided above. Be concise and helpful.

Answer:`;
        } else {
            prompt = `You are ATIO, an AI assistant for food systems and agriculture.

User question: ${message}

Provide a helpful answer based on your knowledge about food systems, agriculture, and related topics.

Answer:`;
        }

        // Call OpenRouter API using fetch
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'meta-llama/llama-3.2-3b-instruct:free',
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const responseText = data.choices[0]?.message?.content || "I couldn't generate a response.";

        // Return response with sources
        return res.status(200).json({
            text: responseText,
            sources: sources.length > 0 ? sources : undefined
        });

    } catch (error) {
        console.error('Chat API Error:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
            details: error.message
        });
    }
}
