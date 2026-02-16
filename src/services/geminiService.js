import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  constructor() {
  }

  async chat(message, history) {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { text: data.text, sources: data.sources };
    } catch (error) {
      console.error("Chat API Error:", error);
      return { text: "Sorry, I encountered an error connecting to the server.", sources: [] };
    }
  }

  async summarizeDocument(content) {
    return "Summarization feature not migrated to backend yet.";
  }
}

export const gemini = new GeminiService();
