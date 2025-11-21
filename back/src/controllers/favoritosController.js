const Usuario = require('../models/usuario');
const Remedio = require('../models/remedio');
const Farmacia = require('../models/farmacia');

const adicionarFavorito = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const { tipo, itemId } = req.body; 
    // tipo = 'remedio' ou 'farmacia'

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    // Verificar o tipo
    if (!['remedio', 'farmacia'].includes(tipo)) {
      return res.status(400).json({
        success: false,
        message: 'Tipo inválido. Use "remedio" ou "farmacia".'
      });
    }

    // Validar o item conforme o tipo
    const Model = tipo === 'remedio' ? Remedio : Farmacia;
    const item = await Model.findById(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `${tipo === 'remedio' ? 'Remédio' : 'Farmácia'} não encontrado`
      });
    }

    // Verifica se já está favoritado
    const jaFavoritado = usuario.favoritos.find(fav => {
      if (tipo === 'remedio') return fav.remedio?.toString() === itemId;
      if (tipo === 'farmacia') return fav.farmacia?.toString() === itemId;
    });

    if (jaFavoritado) {
      return res.status(400).json({
        success: false,
        message: `${tipo === 'remedio' ? 'Remédio' : 'Farmácia'} já está nos favoritos`
      });
    }

    // Inserção conforme o tipo
    const novoFavorito =
      tipo === 'remedio'
        ? { remedio: itemId, notificarEstoque: true }
        : { farmacia: itemId };

    usuario.favoritos.push(novoFavorito);

    await usuario.save();
    await usuario.populate('favoritos.remedio favoritos.farmacia');

    res.json({
      success: true,
      message: `${tipo === 'remedio' ? 'Remédio' : 'Farmácia'} adicionado aos favoritos`,
      data: usuario.favoritos
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



const removerFavorito = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const { tipo, itemId } = req.body;

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    usuario.favoritos = usuario.favoritos.filter(fav => {
      if (tipo === 'remedio') return fav.remedio?.toString() !== itemId;
      if (tipo === 'farmacia') return fav.farmacia?.toString() !== itemId;
      return true;
    });

    await usuario.save();
    await usuario.populate('favoritos.remedio favoritos.farmacia');

    res.json({
      success: true,
      message: `${tipo === 'remedio' ? 'Remédio' : 'Farmácia'} removido dos favoritos`,
      data: usuario.favoritos
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const listarFavoritos = async (req, res) => {
  try {
    const { usuarioId } = req.params;

    const usuario = await Usuario.findById(usuarioId)
      .populate('favoritos.remedio')
      .populate('favoritos.farmacia');

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    res.json({
      success: true,
      count: usuario.favoritos.length,
      data: usuario.favoritos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const toggleNotificacaoEstoque = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const { remedioId } = req.body;

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    const favorito = usuario.favoritos.find(
      fav => fav.remedio?.toString() === remedioId
    );

    if (!favorito) {
      return res.status(404).json({
        success: false,
        message: 'Remédio não encontrado nos favoritos'
      });
    }

    favorito.notificarEstoque = !favorito.notificarEstoque;
    await usuario.save();

    res.json({
      success: true,
      message: `Notificação de estoque ${favorito.notificarEstoque ? 'ativada' : 'desativada'}`,
      data: favorito
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  adicionarFavorito,
  removerFavorito,
  listarFavoritos,
  toggleNotificacaoEstoque
};