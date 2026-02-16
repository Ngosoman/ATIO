import express from 'express';
import cors from 'cors';
import chatHandler from './api/chat.js';
import 'dotenv/config';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Mount the Vercel function handler
app.post('/api/chat', async (req, res) => {
    try {
        await chatHandler(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
