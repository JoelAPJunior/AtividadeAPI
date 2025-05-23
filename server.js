require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET = process.env.JWT_SECRET;


app.use(cors());
app.use(bodyParser.json());

// Credenciais fixas
const USER = {
  email: 'user@exemplo.com',
  senha: '123456'
};

// Rota de login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (email === USER.email && senha === USER.senha) {
    const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  return res.status(401).json({ erro: 'Credenciais inválidas' });
});

// Rota de verificação de status
app.get('/status', (req, res) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.json({ authenticated: false });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET, (err) => {
    if (err) {
      return res.json({ authenticated: false });
    }
    res.json({ authenticated: true });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
