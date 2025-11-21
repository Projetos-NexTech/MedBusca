const express = require('express');
const router = express.Router();
const {
  criarRemedio,
  atualizarRemedio,
  buscarRemedioPorId,
  buscarRemedioPorCategoria,
  buscarRemedioPorNome,
  deletarRemedio,
  listarRemedios
} = require('../controllers/remedioController');


router.post('/', criarRemedio);
router.get('/', listarRemedios);
router.put('/:id', atualizarRemedio);
router.get('/nome/:nome', buscarRemedioPorNome);
router.get('/categoria/:categoria', buscarRemedioPorCategoria);
router.get('/id/:id', buscarRemedioPorId);
router.delete('/:id', deletarRemedio);

module.exports = router;