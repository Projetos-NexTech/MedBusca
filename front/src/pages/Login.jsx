import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/App.css'
import '../styles/components.css'
import Btnvoltar from '../Components/Btnvoltar'
import api from "../service/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const res = await api.post("/api/usuarios/login", { email, senha });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("usuario", JSON.stringify(res.data.usuario));
      localStorage.setItem("usuarioId", res.data.usuario.id);

      alert("Login realizado com sucesso!");
      navigate("/"); // redireciona para página inicial
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.erro || "E-mail ou senha incorretos.");
    }
  };

  return (
    <div className="tela-login">
      <form onSubmit={handleSubmit}>
        <h3>Faça seu login</h3>

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          id="senha"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>
      <button onClick={() => navigate("/cadastro")}>Cadastrar-se</button>
      <Btnvoltar />
    </div>
  )
}

export default Login