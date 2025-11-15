const Remedio = require('../models/remedio');
const { verificarNotificacoesEstoque } = require('../services/notificacaoService');

const criarRemedio = async (req, res) => {
  try {
    const remedio = new Remedio(req.body);
    const resultado = await remedio.save();
    res.status(201).json({
      success: true,
      data: resultado
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Remédio já cadastrado'
      });
    }
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const buscarRemedios = async (req, res) => {
  try {
    const remedios = await Remedio.find();
    res.json({
      success: true,
      count: remedios.length,
      data: remedios
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const buscarRemedioPorId = async (req, res) => {
  try {
    const remedio = await Remedio.findById(req.params.id);
    if (!remedio) {
      return res.status(404).json({
        success: false,
        message: 'Remédio não encontrado'
      });
    }
    res.json({
      success: true,
      data: remedio
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deletarRemedio = async (req, res) => {
  try {
    const remedio = await Remedio.findByIdAndDelete(req.params.id);
    
    if (!remedio) {
      return res.status(404).json({
        success: false,
        message: 'Remédio não encontrado'
      });
    }
    
    res.json({
      success: true,
      message: 'Remédio deletado com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const buscarRemedioPorNome = async (req, res) => {
  try {
    const remedios = await Remedio.find({
      nome: { $regex: req.params.nome, $options: "i" }
    });

    if (!remedios || remedios.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Remédio não encontrado'
      });
    }

    res.json({
      success: true,
      data: remedios
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const buscarRemedioPorCategoria = async (req, res) => {
  try {
    const remedios = await Remedio.find({
      categoria: { $regex: req.params.categoria, $options: "i" }
    });

    if (!remedios || remedios.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Nenhum remédio encontrado na categoria'
      });
    }

    res.json({
      success: true,
      data: remedios
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const atualizarRemedio = async (req, res) => {
  try {
    const remedio = await Remedio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!remedio) {
      return res.status(404).json({
        success: false,
        message: 'Remédio não encontrado'
      });
    }

    // VERIFICAR NOTIFICAÇÕES SE O ESTOQUE MUDOU
    if (req.body.disponivel === true) {
      await verificarNotificacoesEstoque(req.params.id);
    }
    
    res.json({
      success: true,
      data: remedio
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  atualizarRemedio,
  buscarRemedioPorCategoria,
  criarRemedio,
  buscarRemedios,
  buscarRemedioPorId,
  buscarRemedioPorNome,
  deletarRemedio
};