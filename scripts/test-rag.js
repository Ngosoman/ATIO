
// Validating /api/chat.js (RAG Logic)
// This script mimics the Vercel function execution locally.

import 'dotenv/config';
import handler from '../api/chat.js';

// Mock Request/Response
const createMockReqRes = (message) => {
    const req = {
        method: 'POST',
        body: { message }
    };

    const res = {
        status: (code) => {
            console.log(`[Response Status]: ${code}`);
            return res;
        },
        json: (data) => {
            console.log(`[Response Body]:`, JSON.stringify(data, null, 2));
            return res;
        }
    };

    return { req, res };
};

(async () => {
    // Test 1: Local JSON Match
    console.log("--- Test 1: Local JSON Match (Vegetable Production) ---");
    const { req: req1, res: res1 } = createMockReqRes("What is the soil pH for vegetable production?");
    await handler(req1, res1);

    // Test 2: URL Scraping Match (Assuming url.json has foodsystemsdashboard.org)
    // We need a query that matches the content of the URLs in url.json. 
    // The previous url.json had foodsystemsdashboard.org.
    console.log("\n--- Test 2: URL Scraping (Food Systems) ---");
    const { req: req2, res: res2 } = createMockReqRes("What is the Food Systems Dashboard?");
    await handler(req2, res2);

    // Test 3: Google Search Fallback (Something not in local/URL but public)
    console.log("\n--- Test 3: Google Search Fallback (Latest News) ---");
    const { req: req3, res: res3 } = createMockReqRes("Who won the Super Bowl in 2024?");
    await handler(req3, res3);

})();
