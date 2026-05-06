# Lab Work 3: Supply Chain Security & SRI

## Мета
[cite_start]Дослідити вразливості довірених сторонніх бібліотек (CDN) [cite: 3] [cite_start]та впровадити механізм захисту за допомогою Subresource Integrity (SRI)[cite: 11].

## Хід роботи та спостереження

### Task 1: Злам CDN (The CDN Breach)
* [cite_start]**Що було зроблено:** На сервері (Port 6000) було активовано `Breach Mode`, який замінює безпечний скрипт (`react-mock.js`) на шкідливий (`alert(...)`)[cite: 4, 6].
* [cite_start]**Результат:** Шкідливий код успішно виконавсь у поштовому додатку (Port 3000), навіть за наявності збалансованої політики CSP (Content Security Policy)[cite: 8, 9]. 
* [cite_start]**Висновок:** CSP самостійно не здатний відрізнити легітимний код від скомпрометованого, якщо джерело (домен CDN) знаходиться у списку довірених[cite: 10].

### Task 2: Впровадження SRI (Implementing Subresource Integrity)
* [cite_start]**Що було зроблено:** Згенеровано криптографічний SHA-256 хеш оригінального файлу `react-mock.js`[cite: 13]. [cite_start]У HTML-документі додано атрибут `integrity` та `crossorigin="anonymous"` до тегу `<script>`[cite: 15, 17, 18].
* [cite_start]**Результат:** Коли CDN знаходився у `Breach Mode` (роздавав шкідливий код) [cite: 21][cite_start], браузер заблокував виконання скрипта[cite: 23]. [cite_start]У консолі (F12) зафіксовано помилку: *"None of the sha256 hashes in the 'integrity' attribute match the content of the subresource"*[cite: 24].
* [cite_start]**Висновок:** SRI гарантує, що браузер виконає лише той код, який криптографічно збігається з очікуваним "відбитком"[cite: 12].

### Task 3: SRI та версіонування (SRI with Versioning)
* [cite_start]**Що було зроблено:** Змінено версію "безпечного" скрипта на CDN (наприклад, `v1.0.1`)[cite: 27].
* [cite_start]**Результат:** Незважаючи на те, що нові зміни були безпечними, додаток зламався, і скрипт не завантажився[cite: 29]. Зміна навіть одного символу у файлі змінює його хеш, що призводить до блокування з боку SRI.
* [cite_start]**Висновок:** Використання SRI змушує розробників бути дисциплінованими: будь-яке (навіть мінорне) оновлення сторонніх залежностей вимагає обов'язкового оновлення атрибута `integrity` в `index.html` для відновлення працездатності[cite: 26, 30].



echo -n 'console.log("React v1.0.0 loaded from CDN");' | openssl dgst -sha256 -binary | openssl base64 -A