import '../styles/cadastro.css';
import '../styles/components.css';
import Btnvoltar from '../Components/Btnvoltar';
import { useState } from "react";
import api from "../service/api";

const Cadastro = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [forca, setForca] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "senha") avaliarForca(value);
  };

  // ----------------------------------------
  // 🔒 Validação COMPLETA
  // ----------------------------------------
  const validarSenha = (senha) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,_\-@!#$%]).{8,}$/;
    return regex.test(senha);
  };

  // ----------------------------------------
  // 🔥 Função para medir a força da senha
  // ----------------------------------------
  const avaliarForca = (senha) => {
    let pontos = 0;

    if (senha.length >= 8) pontos++;
    if (/[a-z]/.test(senha)) pontos++;
    if (/[A-Z]/.test(senha)) pontos++;
    if (/\d/.test(senha)) pontos++;
    if (/[.,_\-@!#$%]/.test(senha)) pontos++;

    setForca(pontos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarSenha(form.senha)) {
      alert(
        "A senha deve conter:\n- 8 caracteres\n- 1 letra minúscula\n- 1 letra maiúscula\n- 1 número\n- 1 símbolo especial (.,_-@!#$%)"
      );
      return;
    }

    if (form.senha !== form.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const res = await api.post("/api/usuarios", {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
      });

      alert(res.data.mensagem || "Usuário cadastrado com sucesso!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.erro || "Erro ao cadastrar");
    }
  };

  // Texto da força
  const textosForca = ["Muito fraca", "Fraca", "OK", "Boa", "Forte", "Excelente"];
  const coresForca = ["#ff0000", "#ff4d4d", "#ff9900", "#4caf50", "#2e7d32", "#1b5e20"];

  return (
    <div className="tela-login">
      <form onSubmit={handleSubmit} className="login-box">
        <h3>Crie sua conta</h3>

        <label>Nome</label>
        <input
          type="text"
          name="nome"
          placeholder="Digite seu nome completo"
          value={form.nome}
          onChange={handleChange}
          className="login-input"
          required
        />

        <label>E-mail</label>
        <input
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
          value={form.email}
          onChange={handleChange}
          className="login-input"
          required
        />

        <label>Senha</label>
        <div className="senha-wrapper">
          <input
            type={mostrarSenha ? "text" : "password"}
            name="senha"
            placeholder="Digite sua senha"
            value={form.senha}
            onChange={handleChange}
            className="login-input"
            required
          />
          <button
            type="button"
            className="btn-mostrar"
            onClick={() => setMostrarSenha(!mostrarSenha)}
          >
            {mostrarSenha ? "Ocultar" : "Mostrar"}
          </button>
        </div>

        {/* 🔥 Barra de força */}
        {form.senha.length > 0 && (
          <div className="barra-container">
            <div
              className="barra-forca"
              style={{
                width: `${(forca / 5) * 100}%`,
                background: coresForca[forca],
              }}
            ></div>

            <p className="texto-forca" style={{ color: coresForca[forca] }}>
              {textosForca[forca]}
            </p>
          </div>
        )}

        {/* Requisitos */}
        <ul className="requisitos-senha">
          <li className={form.senha.length >= 8 ? "ok" : ""}>• Mínimo 8 caracteres</li>
          <li className={/[a-z]/.test(form.senha) ? "ok" : ""}>• 1 letra minúscula</li>
          <li className={/[A-Z]/.test(form.senha) ? "ok" : ""}>• 1 letra maiúscula</li>
          <li className={/\d/.test(form.senha) ? "ok" : ""}>• 1 número</li>
          <li className={/[.,_\-@!#$%]/.test(form.senha) ? "ok" : ""}>
            • 1 símbolo (.,_-@!#$%)
          </li>
        </ul>

        <label>Confirmar senha</label>
        <input
          type="password"
          name="confirmarSenha"
          placeholder="Digite novamente sua senha"
          value={form.confirmarSenha}
          onChange={handleChange}
          className="login-input"
          required
        />

        <button type="submit" className="btn-entrar">Cadastrar</button>
      </form>
        <div className='btns'>
      <Btnvoltar estilo="voltar-btn" />
        </div>
    </div>
  );
};

export default Cadastro;
