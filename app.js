const form = document.getElementById('loginForm');
const statusText = document.getElementById('status');
const verificarBtn = document.getElementById('verificar');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const res = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  });

  if (res.ok) {
    const data = await res.json();
    localStorage.setItem('token', data.token);
    alert('Login bem-sucedido!');
  } else {
    alert('Falha no login');
  }
});

verificarBtn.addEventListener('click', async () => {
  const token = localStorage.getItem('token');

  const res = await fetch('http://localhost:3000/status', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await res.json();
  statusText.textContent = `Status: ${data.authenticated ? 'Logado' : 'Não logado'}`;
});
