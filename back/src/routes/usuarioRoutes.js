const express = require('express');
const router = express.Router();
const {
  criarUsuario,
  loginUsuario,
  buscarUsuarios,
  buscarUsuarioPorId,
  deletarUsuario
} = require('../controllers/usuarioController');

router.post('/', criarUsuario);
router.post('/login', loginUsuario);
router.get('/', buscarUsuarios);
router.get('/:id', buscarUsuarioPorId);
router.delete('/:id', deletarUsuario);

module.exports = router;