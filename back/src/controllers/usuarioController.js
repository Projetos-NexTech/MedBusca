const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ success: false, message: "Email já cadastrado" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = new Usuario({
      nome,
      email,
      senha: senhaCriptografada,
    });

    const resultado = await usuario.save();

    res.status(201).json({
      success: true,
      message: "Usuário cadastrado com sucesso!",
      data: resultado,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ erro: 'Usuário não encontrado.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ erro: 'Senha incorreta.' });
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET || 'seu_unico_token',
      { expiresIn: '2h' }
    );

    res.json({
      sucesso: true,
      mensagem: 'Login realizado com sucesso!',
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email
      }
    });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao autenticar o usuário.' });
  }
};

const buscarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json({
      success: true,
      count: usuarios.length,
      data: usuarios
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const buscarUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }
    res.json({
      success: true,
      data: usuario
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deletarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Usuário deletado com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// ================================================
// ✅ NOVA FUNÇÃO: ATUALIZAR USUÁRIO POR ID
// ================================================
const atualizarUsuarioPorId = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado"
      });
    }

    // Atualiza somente os campos enviados
    if (nome) usuario.nome = nome;
    if (email) usuario.email = email;

    // Se enviaram senha nova, criptografa novamente
    if (senha) {
      usuario.senha = await bcrypt.hash(senha, 10);
    }

    await usuario.save();

    res.json({
      success: true,
      message: "Usuário atualizado com sucesso",
      data: usuario
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  criarUsuario,
  loginUsuario,
  buscarUsuarios,
  buscarUsuarioPorId,
  deletarUsuario,
  atualizarUsuarioPorId     // 👈 ADICIONADO AQUI
};
