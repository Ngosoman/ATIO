import OpenAI from "openai";
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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
        // Step 1: Specific RAG - Load and search JSON files
        const dataDir = path.join(process.cwd(), 'data');
        let context = '';
        let sources = [];

        if (fs.existsSync(dataDir)) {
            const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && f !== 'url.json');

            // 1. Check Local JSON Files (content, faq, etc.)
            for (const file of files) {
                // Skip url.json for general search, handle separately
                if (file === 'url.json') continue;

                const filePath = path.join(dataDir, file);
                const fileContent = fs.readFileSync(filePath, 'utf8');
                try {
                    const jsonData = JSON.parse(fileContent);

                    // Simple keyword matching for relevance
                    const keywords = message.toLowerCase().split(' ');

                    if (Array.isArray(jsonData)) {
                        jsonData.forEach(item => {
                            // Basic scoring: check if keywords are present in title, content or keywords array
                            let score = 0;
                            keywords.forEach(word => {
                                if (item.title?.toLowerCase().includes(word)) score += 2;
                                if (item.content?.toLowerCase().includes(word)) score += 1;
                                if (item.keywords?.includes(word)) score += 3;
                            });

                            if (score > 2) { // Threshold for relevance
                                context += `Source (Local JSON - ${file}): ${item.content}\n\n`;
                                sources.push({ type: 'local', title: item.title, file: file });
                                localMatchFound = true;
                            }
                        });
                    }
                } catch (parseError) {
                    console.error(`Error parsing ${file}:`, parseError);
                }
            }

            // 2. Check URLs in url.json
            const urlFilePath = path.join(dataDir, 'url.json');
            if (fs.existsSync(urlFilePath)) {
                try {
                    const urlContent = fs.readFileSync(urlFilePath, 'utf8');
                    const urlData = JSON.parse(urlContent);

                    if (urlData.urls && Array.isArray(urlData.urls)) {
                        console.log("Checking URLs for relevant content...");
                        // Limit to top 3 URLs to avoid timeout/quota issues for now
                        const urlsToCheck = urlData.urls.slice(0, 3);

                        for (const url of urlsToCheck) {
                            try {
                                console.log(`Fetching URL: ${url}`);
                                const response = await axios.get(url, {
                                    headers: { 'User-Agent': 'ATIO-RAG-Chatbot/1.0 (educational project)' },
                                    timeout: 5000 // 5s timeout
                                });

                                const $ = cheerio.load(response.data);
                                // Extract text from body, removing scripts/styles
                                $('script').remove();
                                $('style').remove();
                                const text = $('body').text().replace(/\s+/g, ' ').trim();

                                // Simple keyword check on the extracted text
                                const keywords = message.toLowerCase().split(' ');
                                let score = 0;
                                // Check first 1000 chars for relevance to save processing
                                const previewText = text.substring(0, 1000).toLowerCase();

                                keywords.forEach(word => {
                                    if (previewText.includes(word)) score += 1;
                                });

                                if (score > 0) {
                                    // If relevant, add a summary/snippet to context
                                    // We can't add the whole page, it might be too large.
                                    // Let's take the first 2000 chars as context.
                                    context += `Source (URL - ${url}): ${text.substring(0, 2000)}...\n\n`;
                                    sources.push({ type: 'url', title: $('title').text() || url, url: url });
                                    localMatchFound = true;
                                }
                            } catch (urlError) {
                                console.error(`Error fetching URL ${url}:`, urlError.message);
                            }
                        }
                    }
                } catch (urlParseError) {
                    console.error("Error parsing url.json:", urlParseError);
                }
            }
        }

        // Step 3: Google Search Grounding Fallback
        // If we have some context, we use it. If not, or if we want to augment it, 
        // we can use the Google Search tool. The requirement says:
        // "if not available change it from wikipedia to anysource from the internet"

        // We will configure the model with the googleSearch tool.
        // If local context is found, we provide it in the system prompt.
        // If not, the model will likely use the search tool if configured correctly.

        let tools = [];
        // Always enable tools to allow the model to search if local context is insufficient
        // The prompt says "if not available... change to any source".
        // The most robust way is to provide what we have.
        tools = [
            { googleSearch: {} }
        ];

        // For gemini-2.0-flash-lite or standard gemini-2.0-flash which supports tools
        const modelName = "gemini-2.0-flash";
        // Note: Check if flash-lite supports tools. It usually does. 
        // If verification failed on usage limits, we might hit it again if we use search.

        const model = genAI.getGenerativeModel({
            model: modelName,
            tools: tools
        });

        const prompt = `
      You are a helpful AI assistant called ATIO. 
      
      User Question: ${message}

      Existing Context from Knowledge Base:
      ${context ? context : "No relevant local knowledge found."}
      
      Instructions:
      1. Prioritize the "Existing Context" provided above.
      2. If the context contains the answer, answer based strictly on it.
      3. If the context is empty or insufficient, USE GOOGLE SEARCH (if available as a tool) to find the answer.
      4. Do not mention "context" or "snippets" in your final answer, just answer naturally.
      
      Answer:
    `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // If the model used search, we might want to extract sources from groundingMetadata
        // But for this simple implementation, the text response usually includes citations or we rely on what we have.
        // Let's try to get grounding metadata if available.
        const groundingMetadata = result.response.candidates?.[0]?.groundingMetadata;
        if (groundingMetadata?.groundingChunks) {
            groundingMetadata.groundingChunks.forEach(chunk => {
                if (chunk.web?.uri) {
                    sources.push({ type: 'web', title: chunk.web.title || 'Google Search', url: chunk.web.uri });
                }
            });
        }

        res.status(200).json({ text: responseText, sources });

    } catch (error) {
        console.error('Chat API Error:', error);
        if (error.status === 429) {
            return res.status(429).json({
                error: 'Too Many Requests',
                message: 'You have exceeded the Gemini API free tier quota. Please wait a minute and try again.'
            });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
