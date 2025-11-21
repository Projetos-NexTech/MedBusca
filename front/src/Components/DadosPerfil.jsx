import React, { useState, useEffect } from "react";
import "../styles/components.css";
import api from "../service/api";

const DadosPerfil = ({ usuario, onClose, onAtualizado }) => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);

  useEffect(() => {
    if (usuario) {
      setForm({
        nome: usuario.nome || "",
        email: usuario.email || "",
        senha: usuario.senhaDescriptografada || "",
      });
    }
  }, [usuario]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const atual = {};

    if (form.nome !== usuario.nome) atual.nome = form.nome;
    if (form.email !== usuario.email) atual.email = form.email;
    if (form.senha && form.senha !== usuario.senhaDescriptografada)
      atual.senha = form.senha;

    if (Object.keys(atual).length === 0) {
      alert("Nenhuma alteração foi realizada.");
      return;
    }

    try {
      await api.put(`/api/usuarios/${usuario._id}`, atual);
      alert("Dados atualizados!");

      onAtualizado?.();
      onClose();
    } catch (err) {
      alert("Erro ao atualizar.");
      console.error(err);
    }
  };

  return (
    <div className="modal-alt">
      <div className="dados-box">
        <h2>Editar Perfil</h2>
        <form onSubmit={handleSubmit} className="popup-form">
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
          />

          <label>E-mail</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <label>Senha</label>
          <div className="senha-box">
            <input
              type={mostrarSenha ? "text" : "password"}
              name="senha"
              value={form.senha}
              onChange={handleChange}
            />
            <span
              className="iten-senha"
              onClick={() => setMostrarSenha(!mostrarSenha)}
            >
              {mostrarSenha ? "Ocultar" : "Mostrar"}
            </span>
          </div>

          <button type="submit" className="btn-submit">Salvar</button>
          <button className="btn-close" onClick={onClose}>
          Fechar
        </button>
        </form>
      </div>
    </div>
  );
};

export default DadosPerfil;
