import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/App.css";
import "../styles/info.css";
import "../styles/components.css";
import NavBar from "../Components/NavBar";

const Info = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const [farmacia, setFarmacia] = useState(null);
  const [remedios, setRemedios] = useState([]);

  // Buscar farmácia
  useEffect(() => {
    const buscarFarmacia = async () => {
      if (!id) return;

      try {
        const resp = await fetch(`http://localhost:5000/api/farmacias/${id}`);
        if (!resp.ok) return;

        const json = await resp.json();
        setFarmacia(json.data);
      } catch (err) {
        console.error("Erro ao buscar farmácia:", err);
      }
    };

    buscarFarmacia();
  }, [id]);

  // Buscar remédios da farmácia
  useEffect(() => {
    const buscarRemedios = async () => {
      if (!id) return;

      try {
        const resp = await fetch(
          `http://localhost:5000/api/remedios?farmaciaId=${id}`
        );
        if (!resp.ok) return;

        const json = await resp.json();
        setRemedios(json.data);
      } catch (err) {
        console.error("Erro ao buscar remédios:", err);
      }
    };

    buscarRemedios();
  }, [id]);

  if (!farmacia) return <p className="loading">Carregando informações...</p>;

  return (
    <div className="tela-info">
      <NavBar />

      <div className="info-box">
        {/* Cabeçalho da farmácia */}
        <h1 className="info-titulo">{farmacia.nome}</h1>

        <div className="info-dados">
          <p>
            <strong>Endereço:</strong> {farmacia.endereco.rua},{" "}
            {farmacia.endereco.numero} —{" "}
            {farmacia.endereco.bairro}, {farmacia.endereco.cidade} —{" "}
            {farmacia.endereco.estado}
          </p>

          <p>
            <strong>CEP:</strong> {farmacia.endereco.cep}
          </p>

          <p>
            <strong>Telefone:</strong> {farmacia.telefone}
          </p>
        </div>

        {/* Remédios disponíveis */}
        <h2 className="info-subtitulo">Remédios Disponíveis</h2>

        <div className="info-remedios-container">
          {remedios.length === 0 ? (
            <p className="msg-alerta">Nenhum remédio cadastrado.</p>
          ) : (
            remedios.map((r) => (
              <div key={r._id} className="card-remedio">
                <h3>{r.nome}</h3>
                <p className="categoria">{r.categoria}</p>
                <p className="descricao">{r.descricao}</p>
                <p className="preco">
                  {r.preco ? `R$ ${r.preco.toFixed(2)}` : "Preço não informado"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Info;
