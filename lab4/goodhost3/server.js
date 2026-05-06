const express = require('express');
const app = express();

// База даних користувачів для Завдання 1.1
const users = {
    'john_doe': 'password123',
    'jane_smith': 'secure456'
};

app.get('/login', (req, res) => {
    const { username, password } = req.query; 

    if (users[username] && users[username] === password) {
        // Завдання 1: Наївне встановлення cookie без додаткових прапорців безпеки (No HttpOnly, no Secure, no SameSite)
        res.setHeader('Set-Cookie', 'SessionID=abc-123-xyz; Path=/');

        // Завдання 3 (роскоментуйте для тестування): Захист за допомогою HttpOnly
        // res.setHeader('Set-Cookie', 'SessionID=abc-123-xyz; Path=/; HttpOnly');

        // Завдання 4 (роскоментуйте для тестування): Обмеження шляху (Path Limit)[cite: 2]
        // res.setHeader('Set-Cookie', 'SessionID=abc-123-xyz; Path=/api; HttpOnly');

        res.send(`Login Successful! Logged in as ${username}.`);
    } else {
        res.status(401).send("Invalid credentials!");
    }
});