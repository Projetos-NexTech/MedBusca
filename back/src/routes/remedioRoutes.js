const express = require('express');
const router = express.Router();
const {
  criarRemedio,
  atualizarRemedio,
  buscarRemedios,
  buscarRemedioPorId,
  buscarRemedioPorCategoria,
  buscarRemedioPorNome,
  deletarRemedio
} = require('../controllers/remedioController');


router.post('/', criarRemedio);
router.get('/', buscarRemedios);
router.put('/:id', atualizarRemedio);
router.get('/nome/:nome', buscarRemedioPorNome);
router.get('/categoria/:categoria', buscarRemedioPorCategoria);
router.get('/id/:id', buscarRemedioPorId);
router.delete('/:id', deletarRemedio);

module.exports = router;