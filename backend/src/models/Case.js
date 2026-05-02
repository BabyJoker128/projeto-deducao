const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Aberto', 'Em Andamento', 'Fechado'], 
    default: 'Aberto' 
  },
  // Relaciona o caso diretamente ao detetive logado
  detetiveId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  suspeitos: [{
    nome: String,
    ocupacao: String,
    imagemUrl: String, // Link da imagem do suspeito
    vínculo: String
  }],
  
  evidencias: [{
    item: String,
    descricao: String,
    imagemUrl: String, // Foto da evidência
    localEncontrado: String
  }],
  
  dataRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Case', caseSchema);