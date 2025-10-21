const express = require('express');
const router = express.Router();
const {
  adicionarFavorito,
  removerFavorito,
  listarFavoritos,
  toggleNotificacaoEstoque
} = require('../controllers/favoritosController');

router.post('/:usuarioId/favoritos/:remedioId', adicionarFavorito);
router.delete('/:usuarioId/favoritos/:remedioId', removerFavorito);
router.get('/:usuarioId/favoritos', listarFavoritos);
router.patch('/:usuarioId/favoritos/:remedioId/notificacao', toggleNotificacaoEstoque);

module.exports = router;