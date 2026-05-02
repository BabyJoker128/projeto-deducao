const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController'); // Adicione o 'login' aqui

router.post('/register', register);
router.post('/login', login); // Esta é a nova linha do interrogatório

module.exports = router;