import React, { useState, useEffect } from "react";
import "../styles/components.css";
import { useNavigate } from "react-router-dom";

const FarmaciaLog = ({ farmacia, onClose }) => {
  const [favorito, setFavorito] = useState(false);
  const [message] = useState(null);
  const navigate = useNavigate();

  const usuarioId =
    localStorage.getItem("usuarioId") ||
    JSON.parse(localStorage.getItem("usuario"))?.id ||
    null;

  useEffect(() => {
    const verificarFavorito = async () => {
      if (!usuarioId || !farmacia?._id) return;

      try {
        const resp = await fetch(
          `https://backend-production-e39a.up.railway.app/api/favoritos/${usuarioId}/favoritos`
        );
        if (!resp.ok) return;

        const json = await resp.json();
        const lista = json.data || [];
        const existe = lista.some((f) => f.farmacia?._id === farmacia._id);
        setFavorito(existe);
      } catch (err) {
        console.error("Erro ao verificar favoritos:", err);
      }
    };

    verificarFavorito();
  }, [usuarioId, farmacia]);

  const alternarFavorito = async () => {
    if (!usuarioId) return alert("Você precisa estar logado.");
    const url = `https://backend-production-e39a.up.railway.app/api/favoritos/${usuarioId}/favoritos`;
    const body = JSON.stringify({ tipo: "farmacia", itemId: farmacia._id });
    try {
      const resp = await fetch(url, {
        method: favorito ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      if (!resp.ok) {
        const erro = await resp.json().catch(() => null);
        throw new Error(erro?.message || `Status ${resp.status}`);
      }

      setFavorito(!favorito);
      alert(favorito ? "Desfavoritada" : "Favoritada");
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar favorito. Veja console.");
    }
  };

  if (!farmacia) return null;

  const irParaInfo = () => {
  if (!farmacia?._id) return;
  navigate(`/info?id=${farmacia._id}`);
};

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {message && (
          <div className="bg-green-500 text-white p-3 rounded-lg text-center mb-4">
            {message}
          </div>
        )}

        <button className="btn-fechar" onClick={onClose}>
          Fechar
        </button>
        <h2>{farmacia.nome}</h2>
        <p>
          <strong>Endereço:</strong> {farmacia.enderecoCompleto}
        </p>
        <p>
          <strong>Telefone:</strong> {farmacia.telefone || "Não informado"}
        </p>
        <p>
          <strong>Distância:</strong> {farmacia.distancia?.toFixed(2)} km
        </p>

        <button className="btn-favoritar" onClick={alternarFavorito}>
          {favorito ? "Desfavoritar" : "Favoritar"}
        </button>

        <button className="btn-info" onClick={irParaInfo}>
          Mais informações
        </button>
        
        {farmacia.mapsUrl && (
          <a
            href={farmacia.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-maps"
          >
            Ver no Google Maps
          </a>
        )}

        

        
      </div>
    </div>
  );
};

export default FarmaciaLog;
