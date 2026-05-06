const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 4000;

const config = fs.existsSync('config.json') ? JSON.parse(fs.readFileSync('config.json','utf8')) : { mode: 'default' };
const version = fs.existsSync('version.txt') ? fs.readFileSync('version.txt','utf8').trim() : '1.0.0';

console.log(`[System] Starting TrustCo v${version}...`);

if (config.mode === 'mode1') {
  const cors = require('cors');
  app.use(cors());
  console.log('[TrustCo] CORS enabled: *');
}

app.use(express.static(path.join(__dirname, 'public')));


app.get('/support/messages', (req, res) => {
  res.json({ newMessages: Math.random() < 0.5, messages: [{ from: 'support@trustco', text: 'How can we help?' }] });
});

app.listen(PORT, () => console.log(`TrustCo listening on http://localhost:${PORT}`));
