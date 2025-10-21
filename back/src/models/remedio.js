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
    enum: ['Dor e Febre', 'Gripe e Resfriado', 'Estômago e intestino', 'Alergia e infecções'],
  },
  preco: {
    type: Number,
    min: 0
  }
});

module.exports = mongoose.model('remedio', remedioSchema);