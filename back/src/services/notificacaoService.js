const Usuario = require('../models/usuario');
const Remedio = require('../models/remedio');

// Verificar e enviar notificações de estoque
const verificarNotificacoesEstoque = async (remedioId) => {
  try {
    const remedio = await Remedio.findById(remedioId);
    
    if (!remedio || !remedio.disponivel) {
      return;
    }

    // Encontrar todos os usuários que tem este remédio nos favoritos com notificação ativa
    const usuarios = await Usuario.find({
      'favoritos.remedio': remedioId,
      'favoritos.notificarEstoque': true
    });

    for (const usuario of usuarios) {
      // Verificar se já existe notificação não lida para este remédio
      const notificacaoExistente = usuario.notificacoes.find(
        notif => notif.remedio.toString() === remedioId && 
                 notif.tipo === 'estoque' && 
                 !notif.lida
      );

      if (!notificacaoExistente) {
        usuario.notificacoes.push({
          tipo: 'estoque',
          remedio: remedioId,
          mensagem: `🎉 O remédio ${remedio.nome} está disponível em estoque!`
        });

        await usuario.save();
        console.log(`Notificação enviada para ${usuario.email}: ${remedio.nome}`);
      }
    }
  } catch (error) {
    console.error('Erro ao verificar notificações:', error);
  }
};

  const marcarNotificacaoLida = async (usuarioId, notificacaoId) => {
    try {
      const usuario = await Usuario.findById(usuarioId);
      const notificacao = usuario.notificacoes.id(notificacaoId);
      
      if (notificacao) {
        notificacao.lida = true;
        await usuario.save();
      }
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error);
    }
  };

  const listarNotificacoes = async (usuarioId) => {
    try {
      const usuario = await Usuario.findById(usuarioId)
        .populate('notificacoes.remedio')
        .select('notificacoes');
      
      return usuario.notificacoes;
    } catch (error) {
      console.error('Erro ao listar notificações:', error);
      return [];
    }
  };

module.exports = {
  verificarNotificacoesEstoque,
  marcarNotificacaoLida,
  listarNotificacoes
};