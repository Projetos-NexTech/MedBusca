import react from '../assets/icons/react.svg'
import '../styles/App.css'
import '../styles/components.css'
import Btnvoltar from '../Components/Btnvoltar'
import { useState } from "react";
import api from "../service/api";
import CryptoJS from "crypto-js";

const Cadastro = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.senha !== form.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    // Criptografa a senha 

    try {
      const res = await api.post("/api/usuarios", {
        nome: form.nome,
        email: form.email,
        senha: form.senha
      });
      alert(res.data.mensagem || "Usuário cadastrado com sucesso!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.erro || "Erro ao cadastrar");
    }
  };

  return (
    <div className="cadastro-container">
      <form onSubmit={handleSubmit} className="forms">
        <img src={react} alt="logo medbusca" />
        <h3>Faça seu cadastro</h3>
        <br />

        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          name="nome"
          id="nome"
          placeholder="Digite seu nome completo"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <br />


        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Digite seu e-mail"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          name="senha"
          id="senha"
          placeholder="Digite sua senha"
          value={form.senha}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="confirmarSenha">Confirmar senha</label>
        <input
          type="password"
          name="confirmarSenha"
          id="confirmarSenha"
          placeholder="Digite novamente sua senha"
          value={form.confirmarSenha}
          onChange={handleChange}
          required
        />
        <br />

        <button type="submit">Cadastrar</button>
      </form>

      <Btnvoltar />
    </div>
  )
}

export default Cadastro