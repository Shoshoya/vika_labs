У файлі server/js → goodhost3 було додано middleware, яке встановлює заголовок Content-Security-Policy (CSP) залежно від режиму, визначеного у config.json.
Якщо в конфігурації задано "mode": "csp-strict", застосовується політика default-src 'self'. Вона блокує всі зовнішні ресурси, що підтверджується повідомленням браузера: Refused to load the script from 'http://localhost:6000/...' because it violates the directive "default-src 'self'".
У випадку "mode": "csp-balanced" використовується більш гнучка політика:
default-src 'self'; img-src *; style-src *; script-src 'self' http://localhost:4000 http://localhost:6000.
Вона дозволяє виконання скриптів лише з довірених джерел, але блокує сторонні віджети, наприклад: Refused to load the script 'http://localhost:5000/weather.js' because it violates the directive "script-src 'self' http://localhost:4000 http://localhost:6000".
Таким чином, перемикання між режимами в config.json дозволяє балансувати між максимальною безпекою та частковою підтримкою зовнішніх ресурсів.
