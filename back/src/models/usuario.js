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
      remedio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'remedio',
        required: true
      },
      adicionadoEm: {
        type: Date,
        default: Date.now
      },
      notificarEstoque: {
        type: Boolean,
        default: true
      }
    }],
    notificacoes: [{
      remedio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'remedio',
        required: true
      },
      mensagem: String,
      lida: {
        type: Boolean,
        default: false
      }
    }]
});

module.exports = mongoose.model('usuarios', usuarioSchema);