const express = require('express');
const router = express.Router();
const {
  criarFarmacia,
  buscarFarmacias,
  buscarFarmaciaPorId,
  deletarFarmacia
} = require('../controllers/farmaciaController');

router.post('/', criarFarmacia);
router.get('/', buscarFarmacias);
router.get('/:id', buscarFarmaciaPorId);
router.delete('/:id', deletarFarmacia);

module.exports = router;