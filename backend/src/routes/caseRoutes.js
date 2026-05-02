const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

// Importe TODAS as funções aqui
const { 
  getCases, 
  createCase, 
  getCaseById, 
  addEvidence, 
  addSuspect 
} = require('../controllers/caseController');

router.get('/', auth, getCases);
router.post('/', auth, createCase);
router.get('/:id', auth, getCaseById); // Agora ele vai encontrar a função
router.put('/:id/evidence', auth, addEvidence);
router.put('/:id/suspect', auth, addSuspect);

module.exports = router;