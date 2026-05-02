const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // ADICIONE ESTA LINHA AQUI NO TOPO

exports.register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: 'E-mail já registrado.' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    const newUser = new User({ nome, email, senha: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: 'Detetive registrado no Arquivo Central!' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao processar registro.');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Credenciais inválidas.' });

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) return res.status(400).json({ msg: 'Credenciais inválidas.' });

    // Agora o Node vai saber o que é 'jwt' por causa da importação no topo
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: { id: user._id, nome: user.nome, email: user.email }
    });
  } catch (err) {
    console.error(err); // Isso ajuda a ver o erro no terminal se algo falhar
    res.status(500).send('Erro no servidor.');
  }
};