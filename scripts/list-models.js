import 'dotenv/config';

async function listModels() {
    try {
        const key = process.env.GEMINI_API_KEY;
        if (!key) {
            console.error("No API Key found!");
            return;
        }
        console.log("Fetching models...");
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);

        if (!response.ok) {
            console.error(`Error fetching models: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error(text);
            return;
        }

        const data = await response.json();
        console.log("Available Models:");
        if (data.models) {
            data.models.forEach(m => console.log(`- ${m.name} (${m.version})`));
        } else {
            console.log("No models property in response", data);
        }

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
