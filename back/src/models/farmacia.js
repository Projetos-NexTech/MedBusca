const mongoose = require('mongoose');

const farmaciaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
  },
  telefone: {
    type: String,
    required: [true, 'telefone é obrigatório'],
  },
  endereco: {
    rua: {
      type: String,
      required: true
    },
    numero: {
      type: String,
      required: true
    },
    complemento: String,
    bairro: {
      type: String,
      required: true
    },
    cidade: {
      type: String,
      required: true
    },
    estado: {
      type: String,
      required: true,
      maxlength: 2
    },
    cep: {
      type: String,
      required: true
    },
    latitude: {
      type: String,
      required: true
    },
    longitude: {
      type: String,
      required: true
    }
  }
});

// Método virtual para gerar URL do Google Maps
farmaciaSchema.methods.gerarUrlMaps = function() {
  const enderecoCompleto = `${this.endereco.rua} ${this.endereco.numero}, ${this.endereco.bairro}, ${this.endereco.cidade}, ${this.endereco.estado}`;
  return `https://maps.google.com/?q=${encodeURIComponent(enderecoCompleto)}`;
};

// Método para formatar o endereço completo
farmaciaSchema.methods.getEnderecoCompleto = function() {
  let endereco = `${this.endereco.rua} ${this.endereco.numero}`;
  if (this.endereco.complemento) {
    endereco += `, ${this.endereco.complemento}`;
  }
  endereco += `, ${this.endereco.bairro}, ${this.endereco.cidade} - ${this.endereco.estado}, ${this.endereco.cep}`;
  return endereco;
};

module.exports = mongoose.model('Farmacia', farmaciaSchema);