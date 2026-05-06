const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5000;

const argvMode = (process.argv.find(a => a.startsWith('--mode=')) || process.argv.find(a => a === '--mode') || '').toString();
let mode = 'normal';
if (process.argv.includes('--mode') && process.argv[process.argv.indexOf('--mode')+1]) {
  mode = process.argv[process.argv.indexOf('--mode')+1];
} else if (argvMode.startsWith('--mode=')) {
  mode = argvMode.split('=')[1];
} else if (process.argv.includes('--mode=breach1')) {
  mode = 'breach1';
}

const config = fs.existsSync('config.json') ? JSON.parse(fs.readFileSync('config.json','utf8')) : { mode };
const version = fs.existsSync('version.txt') ? fs.readFileSync('version.txt','utf8').trim() : '1.0.0';

console.log(`[System] Starting WeatherApp v${version} in mode: ${mode}`);

if (config.mode === 'mode1') {
  const cors = require('cors');
  app.use(cors());
  console.log('[WeatherApp] CORS enabled: *');
}


app.get('/weather.js', (req, res) => {
  res.type('application/javascript');
  if (mode === 'breach1') {
    
    res.send(`
      console.log('Weather widget loaded in BREACH1 mode');
      (function(){
        try {
          alert("HACKED: I can see your cookies: " + document.cookie + " and User: " + (document.getElementById('username') ? document.getElementById('username').innerText : '[no username]'));
        } catch(e) {
          console.error('Breach script error', e);
        }
      })();
    `);
  } else {
    
    res.send(`
      console.log('Weather widget loaded (normal mode)');
      (function(){
        const temp = (20 + Math.floor(Math.random()*10)) + '°C';
        console.log('Current temperature: ' + temp);
      })();
    `);
  }
});


app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`WeatherApp listening on http://localhost:${PORT}`));
