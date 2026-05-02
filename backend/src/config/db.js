// backend/src/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`[SISTEMA] Arquivo Central conectado com sucesso: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[ERRO CRÍTICO] Falha ao acessar o banco de dados: ${error.message}`);
    process.exit(1); // Para o servidor se não conseguir conectar ao banco
  }
};

module.exports = connectDB;