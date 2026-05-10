const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 6000;

const config = fs.existsSync('config.json') ? JSON.parse(fs.readFileSync('config.json','utf8')) : { mode: 'default' };
const version = fs.existsSync('version.txt') ? fs.readFileSync('version.txt','utf8').trim() : '1.0.0';

console.log(`[System] Starting StaticHost v${version}...`);
 
if (config.mode === 'mode1') {
  const cors = require('cors');
  app.use(cors());
  console.log('[StaticHost] CORS enabled: *');
}


app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`StaticHost listening on http://localhost:${PORT}`));
