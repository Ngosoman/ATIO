
// import { GoogleGenAI } from "@google/genai";

// export class GeminiService {
//   constructor() {
//     // Initializing Gemini API with the API key from environment variables.
//     // this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
//   }

//   async chat(message, history) {
//     try {
//       const response = await this.ai.models.generateContent({
//         model: 'gemini-3-pro-preview',
//         contents: [
//           ...history.map(m => ({
//             role: m.role === 'user' ? 'user' : 'model',
//             parts: [{ text: m.content }]
//           })),
//           { role: 'user', parts: [{ text: message }] }
//         ],
//         config: {
//           tools: [{ googleSearch: {} }],
//           systemInstruction: "You are ATIO, an Advanced Technical Information Organizer. Help users organize, retrieve, and understand complex technical information from their knowledge base. Use search for current facts."
//         }
//       });

//       const text = response.text || "I'm sorry, I couldn't process that request.";
//       const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
//         ?.map((chunk) => chunk.web?.uri)
//         .filter(Boolean);

//       return { text, sources };
//     } catch (error) {
//       console.error("Gemini API Error:", error);
//       throw error;
//     }
//   }

//   async summarizeDocument(content) {
//     const response = await this.ai.models.generateContent({
//       model: 'gemini-3-flash-preview',
//       contents: `Summarize the following technical document content: ${content}`,
//       config: {
//         thinkingConfig: { thinkingBudget: 0 }
//       }
//     });
//     return response.text || "Summary failed.";
//   }
// }

// export const gemini = new GeminiService();


import { GoogleGenAI } from "@google/genai";

export const getGeminiResponse = async (prompt, context) => {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
  
  const systemInstruction = `
    You are ATIO Intelligence, the official research assistant for the ATIO Knowledge Base (FAO Agrifood Technology & Innovation Outlook).
    Your role is to help users understand agrifood technologies and innovations across Sub-Saharan Africa.
    Be data-driven, professional, and clear. Help policy makers, farmers, and researchers find relevant info.
    Current context: ${context || 'General browsing'}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.5,
      },
    });

    return response.text || "I'm sorry, I couldn't find information on that topic.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "A connection error occurred. Please try again.";
  }
};
