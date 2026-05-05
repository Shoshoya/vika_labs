у файлі server/js -> goodhost3 були додані наступні рядки коду для впровадження CSP:
app.use((req, res, next) => {
  if (config.mode === 'csp-strict') {
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    console.log('[System] CSP applied: csp-strict');
  } else if (config.mode === 'csp-balanced') {
    res.setHeader('Content-Security-Policy',
      "default-src 'self'; img-src *; style-src *; script-src 'self' http://localhost:4000 http://localhost:6000");
    console.log('[System] CSP applied: csp-balanced');
  }
  next();
});


у config.json ми перемикались між режимами політики обмежень:
"mode": "csp-balanced" або "csp-strict"


Режим csp-strict блокує всі зовнішні ресурси:
Refused to load the script from 'http://localhost:6000/...' because it violates the following Content Security Policy directive: "default-src 'self'".

Режим  csp-balanced обмежує скрипти які можуть бути виконані лише довіреними і блокує віджет погоди:
Refused to load the script 'http://localhost:5000/weather.js' because it violates the following Content Security Policy directive: "script-src 'self' http://localhost:4000 http://localhost:6000".