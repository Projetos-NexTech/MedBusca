const express = require('express');
const router = express.Router();
const { marcarNotificacaoLida, listarNotificacoes } = require('../services/notificacaoService');

router.get('/:usuarioId/notificacoes', async (req, res) => {
  try {
    const notificacoes = await listarNotificacoes(req.params.usuarioId);
    res.json({
      success: true,
      data: notificacoes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.patch('/:usuarioId/notificacoes/:notificacaoId/lida', async (req, res) => {
  try {
    await marcarNotificacaoLida(req.params.usuarioId, req.params.notificacaoId);
    res.json({
      success: true,
      message: 'Notificação marcada como lida'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;