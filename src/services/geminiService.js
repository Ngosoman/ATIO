export const gemini = {
  chat: async (message, history) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, history }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Too Many Requests");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        text: data.text,
        sources: data.sources || []
      };
    } catch (error) {
      console.error('Chat API Error:', error);
      throw error;
    }
  }
};
