const express = require('express');
const app = express();
const PORT = 6000;

// Змініть isBreached на true, щоб увімкнути Breach Mode (Завдання 1)
let isBreached = false; 

app.get('/react-mock.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    // Дозвіл CORS необхідний для атрибута crossorigin="anonymous" у тезі script
    res.setHeader('Access-Control-Allow-Origin', '*'); 

    if (isBreached) {
        // Breach Mode: Повертає шкідливий код [cite: 6]
        res.send('alert("CRITICAL: CDN Compromised! Stealing data...");');
    } else {
        // Normal Mode: Повертає звичайний код [cite: 5]
        res.send('console.log("React v1.0.0 loaded from CDN");');
    }
});

app.listen(PORT, () => {
    console.log(`CDN Server (Mock) is running on http://localhost:${PORT}`);
});
