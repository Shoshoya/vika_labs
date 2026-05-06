(function(){
  console.log('Support widget loaded from TrustCo (Port 4000)');
  function createButton() {
    const root = document.getElementById('support-root') || document.body;
    const btn = document.createElement('button');
    btn.innerText = 'Chat with Support';
    btn.style.padding = '10px 14px';
    btn.style.background = '#0a58ca';
    btn.style.color = '#fff';
    btn.style.border = 'none';
    btn.style.borderRadius = '6px';
    btn.style.cursor = 'pointer';
    btn.onclick = async function() {
      try {
        const res = await fetch('http://localhost:4000/support/messages');
        const data = await res.json();
        alert('Support check: newMessages=' + data.newMessages);
      } catch (err) {
        console.error('Support fetch failed', err);
        alert('Support fetch failed (see console)');
      }
    };
    
    const container = document.getElementById('support-root') || document.body;
    container.appendChild(btn);
  }

  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createButton);
  } else {
    createButton();
  }
})();
