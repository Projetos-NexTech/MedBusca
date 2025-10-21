const Farmacia = require('../models/farmacia');

const criarFarmacia = async (req, res) => {
  try {
    const farmacia = new Farmacia(req.body);
    const resultado = await farmacia.save();
    
    // Adiciona a URL do Maps na resposta
    const resposta = resultado.toObject();
    resposta.mapsUrl = resultado.gerarUrlMaps();
    resposta.enderecoCompleto = resultado.getEnderecoCompleto();
    
    res.status(201).json({
      success: true,
      data: resposta
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Farmácia já cadastrada'
      });
    }
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const buscarFarmacias = async (req, res) => {
  try {
    const farmacias = await Farmacia.find();
    
    // Adiciona URL do Maps para cada farmácia
    const farmaciasComMaps = farmacias.map(farmacia => {
      const farmaciaObj = farmacia.toObject();
      return {
        ...farmaciaObj,
        mapsUrl: farmacia.gerarUrlMaps(),
        enderecoCompleto: farmacia.getEnderecoCompleto()
      };
    });
    
    res.json({
      success: true,
      count: farmaciasComMaps.length,
      data: farmaciasComMaps
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const buscarFarmaciaPorId = async (req, res) => {
  try {
    const farmacia = await Farmacia.findById(req.params.id);
    if (!farmacia) {
      return res.status(404).json({
        success: false,
        message: 'Farmácia não encontrada'
      });
    }
    
    // Adiciona URL do Maps na resposta
    const resposta = farmacia.toObject();
    resposta.mapsUrl = farmacia.gerarUrlMaps();
    resposta.enderecoCompleto = farmacia.getEnderecoCompleto();
    
    res.json({
      success: true,
      data: resposta
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deletarFarmacia = async (req, res) => {
  try {
    const farmacia = await Farmacia.findByIdAndDelete(req.params.id);
    
    if (!farmacia) {
      return res.status(404).json({
        success: false,
        message: 'Farmácia não encontrada'
      });
    }
    
    res.json({
      success: true,
      message: 'Farmácia deletada com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  criarFarmacia,
  buscarFarmacias,
  buscarFarmaciaPorId,
  deletarFarmacia
};