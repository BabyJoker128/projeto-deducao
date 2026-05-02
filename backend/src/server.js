require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// 1. Importação das Rotas
const authRoutes = require('./routes/authRoutes');
const caseRoutes = require('./routes/caseRoutes');

const app = express();

// 2. Inicia a conexão com o MongoDB Atlas
connectDB();

// No seu server.js

/// 3. Middlewares Globais
// Certifique-se de que este bloco esteja ANTES de app.use('/api/auth', ...)
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = ['https://projeto-deducao.vercel.app', 'http://localhost:5173'];
    // Permite requisições sem origin (como mobile ou ferramentas de teste) 
    // ou que venham dos domínios autorizados
    if (!origin || allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Acesso bloqueado pelo protocolo de segurança CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-auth-token', 'Authorization'],
  optionsSuccessStatus: 200
}));

// Esta linha é crucial para responder explicitamente às requisições OPTIONS
app.options('*', cors());
app.use(express.json());

// 4. Definição das Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/cases', caseRoutes);

// Rota de Teste de Rede
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'Operacional', 
    mensagem: 'Servidor de investigação online.' 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`[SISTEMA] Servidor rodando na porta ${PORT}`);
  console.log(`========================================\n`);
});