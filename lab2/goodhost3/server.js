const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const version = fs.existsSync('version.txt') ? fs.readFileSync('version.txt','utf8').trim() : '1.0.0';
const config = fs.existsSync('config.json') ? JSON.parse(fs.readFileSync('config.json','utf8')) : { appName: 'SecureMail Pro', version, mode: 'default' };

console.log(`[System] Starting ${config.appName} v${config.version}...`);

// Enable CORS for legacy mode1 (unchanged behavior)
if (config.mode === 'mode1') {
  const cors = require('cors');
  app.use(cors());
  console.log('[System] CORS enabled: *');
}

// Content Security Policy middleware
app.use((req, res, next) => {
  if (config.mode === 'csp-strict') {
    // Only allow same-origin for everything
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    console.log('[System] CSP applied: csp-strict');
  } else if (config.mode === 'csp-balanced') {
    // Allow images and styles from anywhere, scripts only from self and trusted hosts
    res.setHeader('Content-Security-Policy',
      "default-src 'self'; img-src *; style-src *; script-src 'self' http://localhost:4000 http://localhost:6000");
    console.log('[System] CSP applied: csp-balanced');
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

const emails = [
  { id: 1, sender: 'alice@example.com', subject: 'Welcome', body: 'Welcome to SecureMail Pro!' },
  { id: 2, sender: 'bob@example.com', subject: 'Meeting', body: 'Let\'s meet tomorrow at 10.' }
];

app.get('/api/emails', (req, res) => {
  res.json(emails);
});

app.listen(PORT, () => {
  console.log(`[GoodHost] Listening on http://localhost:${PORT}`);
});


