const express = require('express');
const router = express.Router();
const {
  adicionarFavorito,
  removerFavorito,
  listarFavoritos,
  toggleNotificacaoEstoque
} = require('../controllers/favoritosController');

router.post('/:usuarioId/favoritos', adicionarFavorito);
router.delete('/:usuarioId/favoritos', removerFavorito);
router.get('/:usuarioId/favoritos', listarFavoritos);
router.patch('/:usuarioId/favoritos/notificacao', toggleNotificacaoEstoque);

module.exports = router;