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

/// 3. Middlewares Globais
app.use(cors({
  origin: ['https://projeto-deducao.vercel.app', 'http://localhost:5173'], // Permite sua Vercel e o Vite local
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-auth-token'], // Essencial para o seu interceptor de login
  optionsSuccessStatus: 200
}));

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