const Usuario = require('../models/usuario');

const criarUsuario = async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    const resultado = await usuario.save();
    res.status(201).json({
      success: true,
      data: resultado
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email já cadastrado'
      });
    }
    res.status(400).json({
      success: false,
      message: error.message
    });
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

module.exports = {
  criarUsuario,
  buscarUsuarios,
  buscarUsuarioPorId,
  deletarUsuario
};