const express = require('express');
const router = express.Router();
const {
  criarUsuario,
  buscarUsuarios,
  buscarUsuarioPorId,
  deletarUsuario
} = require('../controllers/usuarioController');

router.post('/', criarUsuario);
router.get('/', buscarUsuarios);
router.get('/:id', buscarUsuarioPorId);
router.delete('/:id', deletarUsuario);

module.exports = router;