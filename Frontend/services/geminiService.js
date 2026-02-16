
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  constructor() {
    // Initializing Gemini API with the API key from environment variables.
    // this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async chat(message, history) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [
          ...history.map(m => ({ 
            role: m.role === 'user' ? 'user' : 'model', 
            parts: [{ text: m.content }] 
          })),
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: "You are ATIO, an Advanced Technical Information Organizer. Help users organize, retrieve, and understand complex technical information from their knowledge base. Use search for current facts."
        }
      });

      const text = response.text || "I'm sorry, I couldn't process that request.";
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.map((chunk) => chunk.web?.uri)
        .filter(Boolean);

      return { text, sources };
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }

  async summarizeDocument(content) {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize the following technical document content: ${content}`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text || "Summary failed.";
  }
}

export const gemini = new GeminiService();
