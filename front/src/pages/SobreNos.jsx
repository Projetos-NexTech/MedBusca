import React from "react";
import NavBar from "../Components/NavBar";
import "../styles/sobrenos.css";
import "../styles/components.css";
import Btnvoltar from "../Components/Btnvoltar";

const SobreNos = () => {
  return (
    <div className="tela-sobrenos">

      <NavBar />

      <div className="sobre-wrapper">
        <h1 className="sobre-titulo">Sobre Nós</h1>

        <p className="sobre-descricao">
          Nossa plataforma foi criada com o propósito de transformar a forma como as pessoas interagem com a saúde,
          oferecendo tecnologia acessível, eficiente e humana.
        </p>

        <div className="card-sobre">
          <div className="card-icon no-icon">🎯</div>
          <h2>Missão</h2>
          <p>
            Conectar pessoas e transformar a saúde com soluções inovadoras,
            rápidas e acessíveis, garantindo uma experiência mais humana e inteligente.
          </p>
        </div>

        <div className="card-sobre">
          <div className="card-icon no-icon">👀</div>
          <h2>Visão</h2>
          <p>
            Ser a principal referência em tecnologia aplicada à saúde, reconhecida pela simplicidade,
            eficácia e impacto positivo na vida das pessoas.
          </p>
        </div>

        <div className="card-sobre">
          <div className="card-icon no-icon">✔️</div>
          <h2>Valores</h2>
          <ul className="lista-valores">
            <li>Inovação contínua</li>
            <li>Humanização</li>
            <li>Transparência</li>
            <li>Acessibilidade</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default SobreNos;
