fetch('/api/emails')
  .then(res => res.json())
  .then(emails => {
    const list = document.getElementById('emailList');
    emails.forEach(email => {
      const li = document.createElement('li');
      li.innerText = `${email.sender} — ${email.subject}`;
      li.style.cursor = 'pointer';
      li.addEventListener('click', () => {
        document.getElementById('emailSubject').innerText = email.subject;
        document.getElementById('emailBody').innerText = email.body;
      });
      list.appendChild(li);
    });
  })
  .catch(err => console.error('Failed to load emails', err));
