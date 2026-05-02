const Case = require('../models/Case');

exports.getCases = async (req, res) => {
  try {
    // req.user.id vem do nosso middleware de autenticação
    const cases = await Case.find({ detetiveId: req.user.id });
    res.json(cases);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao recuperar seus arquivos.' });
  }
};

exports.createCase = async (req, res) => {
  try {
    const { titulo, descricao, status, suspeitos, evidencias } = req.body;
    
    const newCase = new Case({
      titulo,
      descricao,
      status,
      suspeitos,
      evidencias,
      detetiveId: req.user.id // Salva quem criou o caso
    });

    await newCase.save();
    res.status(201).json(newCase);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao registrar investigação.' });
  }
};

exports.getCaseById = async (req, res) => {
  try {
    // Busca o caso pelo ID garantindo que pertence ao detetive logado
    const caso = await Case.findOne({ _id: req.params.id, detetiveId: req.user.id });
    
    if (!caso) {
      return res.status(404).json({ msg: 'Dossier não encontrado ou acesso negado.' });
    }
    
    res.json(caso);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao acessar o Arquivo Central.' });
  }
};

exports.addEvidence = async (req, res) => {
  try {
    const { id } = req.params; // ID do caso
    const updatedCase = await Case.findOneAndUpdate(
      { _id: id, detetiveId: req.user.id }, // Só o dono do caso pode editar
      { $push: { evidencias: req.body } },  // Adiciona ao array
      { new: true }
    );
    res.json(updatedCase);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao atualizar dossier.' });
  }
};

exports.addSuspect = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCase = await Case.findOneAndUpdate(
      { _id: id, detetiveId: req.user.id }, // Garante que o caso pertence ao usuário logado
      { $push: { suspeitos: req.body } },    // Adiciona o novo suspeito ao array
      { new: true }
    );
    res.json(updatedCase);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao registrar suspeito no dossier.' });
  }
};