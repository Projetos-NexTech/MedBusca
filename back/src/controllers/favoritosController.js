const Usuario = require('../models/usuario');
const Remedio = require('../models/remedio');

const adicionarFavorito = async (req, res) => {
  try {
    const { usuarioId, remedioId } = req.params;

    // Verificar se usuário existe
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    // Verificar se remédio existe
    const remedio = await Remedio.findById(remedioId);
    if (!remedio) {
      return res.status(404).json({
        success: false,
        message: 'Remédio não encontrado'
      });
    }

    // Verificar se já está nos favoritos
    const jaFavoritado = usuario.favoritos.find(
      fav => fav.remedio.toString() === remedioId
    );

    if (jaFavoritado) {
      return res.status(400).json({
        success: false,
        message: 'Remédio já está nos favoritos'
      });
    }
    usuario.favoritos.push({
      remedio: remedioId,
      notificarEstoque: true
    });

    await usuario.save();
    await usuario.populate('favoritos.remedio', null, 'remedio');

    res.json({
      success: true,
      message: 'Remédio adicionado aos favoritos',
      data: usuario.favoritos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const removerFavorito = async (req, res) => {
  try {
    const { usuarioId, remedioId } = req.params;

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    usuario.favoritos = usuario.favoritos.filter(
      fav => fav.remedio.toString() !== remedioId
    );

    await usuario.save();
    await usuario.populate('favoritos.remedio', null, 'remedio');

    res.json({
      success: true,
      message: 'Remédio removido dos favoritos',
      data: usuario.favoritos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const listarFavoritos = async (req, res) => {
  try {
    const { usuarioId } = req.params;

    const usuario = await Usuario.findById(usuarioId).populate('favoritos.remedio');
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
    const { usuarioId, remedioId } = req.params;

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }

    const favorito = usuario.favoritos.find(
      fav => fav.remedio.toString() === remedioId
    );

    if (!favorito) {
      return res.status(404).json({
        success: false,
        message: 'Remédio não encontrado nos favoritos'
      });
    }

    // Alternar notificação
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