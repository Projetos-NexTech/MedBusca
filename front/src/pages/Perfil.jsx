import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Btnvoltar from "../Components/Btnvoltar";
import api from "../service/api";
import "../styles/App.css";
import "../styles/components.css";

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);

 useEffect(() => {
       const id = localStorage.getItem("usuarioId");

  if (!id) {
    console.log("Nenhum ID encontrado no localStorage.");
    return;
  }

  api.get(`/api/usuarios/${id}`)
    .then((res) => {
      setUsuario(res.data.data);
    })
    .catch((err) => {
      console.error("Erro ao buscar usuário:", err);
    });
}, []);

  return (
    <div className="tela-perfil">
      <NavBar />
      <div className="perfil-container">
        <h2>Meu Perfil</h2>
        {usuario ? (
          <div className="perfil-info">
            <p><strong>Nome:</strong> {usuario.nome}</p>
            <p><strong>E-mail:</strong> {usuario.email}</p>
            <a href="/dados-perfil">Dados do usuario</a>
            <p>ao invés de ser uma tela pode ser um componente que expande e mostra um pequeno form ja preechido com os dados para poder atualizar caso queira</p>
          </div>
        ) : (
          <p>Carregando informações...</p>
        )}
        <br />
        <Btnvoltar />
      </div>
    </div>
  );
};

export default Perfil;
