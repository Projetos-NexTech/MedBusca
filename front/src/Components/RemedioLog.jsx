import React, { useState, useEffect } from "react";
import "../styles/components.css";
import { useNavigate } from "react-router-dom";

const RemedioLog = ({ remedio, onClose }) => {
  const [favorito, setFavorito] = useState(false);
  const [farmacia, setFarmacia] = useState(null);
   const navigate = useNavigate();

  const usuarioId =
    localStorage.getItem("usuarioId") ||
    JSON.parse(localStorage.getItem("usuario"))?.id ||
    null;

  // 🔹 Verifica se o remédio já é favorito
  useEffect(() => {
    const verificarFavorito = async () => {
      if (!usuarioId || !remedio?._id) return;

      try {
        const resp = await fetch(
          `https://backend-production-e39a.up.railway.app/api/favoritos/${usuarioId}/favoritos`
        );

        if (!resp.ok) return;

        const json = await resp.json();
        const lista = json.data || [];

        const existe = lista.some((f) => f.remedio?._id === remedio._id);
        setFavorito(existe);
      } catch (err) {
        console.error("Erro ao verificar favoritos:", err);
      }
    };

    verificarFavorito();
  }, [usuarioId, remedio]);

  // 🔹 Busca dados da farmácia vinculada ao remédio
  useEffect(() => {
    const buscarFarmacia = async () => {
      if (!remedio?.farmaciaId) return;

      try {
        const resp = await fetch(
          `https://backend-production-e39a.up.railway.app/api/farmacias/${remedio.farmaciaId}`
        );
        if (!resp.ok) return;

        const json = await resp.json();
        setFarmacia(json.data);
      } catch (err) {
        console.error("Erro ao buscar farmácia:", err);
      }
    };

    buscarFarmacia();
  }, [remedio?.farmaciaId]);

  // 🔹 Alterna favorito
  const alternarFavorito = async () => {
    if (!usuarioId) {
      alert("Você precisa estar logado para favoritar remédios.");
      return;
    }

    const url = `https://backend-production-e39a.up.railway.app/api/favoritos/${usuarioId}/favoritos`;
    const body = JSON.stringify({ tipo: "remedio", itemId: remedio._id });

    try {
      const resposta = await fetch(url, {
        method: favorito ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      if (!resposta.ok) {
        const erroJson = await resposta.json().catch(() => null);
        const msg = erroJson?.message || `Status ${resposta.status}`;
        throw new Error(msg);
      }

      setFavorito(!favorito);
      alert(
        favorito ? "Remédio removido dos favoritos" : "Remédio favoritado!"
      );
    } catch (erro) {
      console.error("Erro ao favoritar:", erro);
      alert("Erro ao atualizar favorito. Veja console para mais detalhes.");
    }
  };

  if (!remedio) return null;

  const irParaInfo = () => {
    if (!farmacia?._id) return;
    navigate(`/info?id=${farmacia._id}`);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="btn-fechar" onClick={onClose}>
          Fechar
        </button>

        <h2>{remedio.nome}</h2>

        <p>
          <strong>Farmácia Distribuidora:</strong>{" "}
          {farmacia ? farmacia.nome : "Carregando..."}
        </p>

        <p>
          <strong>Preço Médio:</strong>{" "}
          {remedio.preco ? `R$ ${remedio.preco.toFixed(2)}` : "Não informado"}
        </p>

        <p>
          <strong>Descrição:</strong>{" "}
          {remedio.descricao || "Sem descrição disponível."}
        </p>

        {farmacia && farmacia.link && (
          <>
            <hr />
            <a
              href={farmacia.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-maps"
            >
              Visitar farmácia
            </a>
          </>
        )}

        <button className="btn-favoritar" onClick={alternarFavorito}>
          {favorito ? "Desfavoritar" : "Favoritar"}
        </button>

        <button className="btn-info" onClick={irParaInfo}>
          Mais informações
        </button>
      </div>
    </div>
  );
};

export default RemedioLog;
