import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import chatHandler from './api/chat.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env from the root directory
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Mount the Vercel function handler
app.post('/api/chat', async (req, res) => {
    try {
        await chatHandler(req, res);
    } catch (error) {
        console.error('Unhandled Server Error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
