const mongoose = require('mongoose');

const remedioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome do remédio é obrigatório'],
    trim: true
  },
  descricao: {
    type: String,
    required: [true, 'Descrição do remédio é obrigatória'],
    trim: true
  },
  categoria: {
    type: String,
    enum: ['analgesicos', 'antibioticos', 'vitaminas', 'genericos', 'antialergicos'],
  },
  preco: {
    type: Number,
    min: 0
  },
  farmaciaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farmacia",
    required: true
  }
});

module.exports = mongoose.model('remedio', remedioSchema);