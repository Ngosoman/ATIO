
import { GoogleGenAI } from "@google/genai";

export const getChatbotResponse = async (history, currentMessage, persona) => {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
  
  try {
    const model = 'gemini-3-flash-preview';
    const systemInstruction = `
      You are the ATIO Food Systems AI Assistant.
      Your current user is a ${persona.toUpperCase()}.
      Adjust your tone and complexity accordingly:
      - Farmer: Practical, simple language, action-oriented. Focus on yield, weather, and basic market advice.
      - Researcher: Technical, data-focused, cite FAO/ATIO data where possible. Focus on correlations and scientific rigor.
      - Policymaker: Strategic, focused on SDGs, impact, and high-level trends. Focus on socioeconomic stability and global policy.
      Keep answers concise and agriculture-focused.
    `;

    const chatHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const response = await ai.models.generateContent({
      model,
      contents: [
        ...chatHistory,
        { role: 'user', parts: [{ text: currentMessage }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection error. Please check if your API key is active and try again.";
  }
};
