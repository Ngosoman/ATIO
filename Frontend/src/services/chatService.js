export const chatService = {
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
                let errorMessage = `HTTP error! status: ${response.status}`;
                try {
                    const errorData = await response.json();
                    if (response.status === 429) {
                        errorMessage = errorData.message || "Please wait a few seconds and try again";
                    } else {
                        errorMessage = errorData.message || errorMessage;
                    }
                } catch (e) {
                    // Not JSON, use default
                }
                throw new Error(errorMessage);
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
