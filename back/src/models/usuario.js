const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true,
  },
  senha: {
    type: String,
    required: [true, 'Senha é obrigatória'],
  },

    favoritos: [{
      farmacia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmacia',
        required: false
      },
      remedio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Remedio',
        required: false
      },
      adicionadoEm: {
        type: Date,
        default: Date.now
      },
      notificarEstoque: {
        type: Boolean,
        default: true
      }
    }]
});

module.exports = mongoose.model('Usuario', usuarioSchema);