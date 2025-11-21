import React, { useEffect, useState } from "react";
import api from "../service/api";
import "../styles/components.css";

const Favoritos = ({ usuarioId, onClose, onAbrirFarmacia, onAbrirRemedio }) => {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    api
      .get(`/api/favoritos/${usuarioId}/favoritos`)
      .then((res) => setFavoritos(res.data.data))
      .catch((err) => console.error("Erro ao carregar favoritos:", err));
  }, [usuarioId]);

  const remover = async (tipo, itemId) => {
    try {
      await api.delete(`/api/favoritos/${usuarioId}/favoritos`, {
        data: { tipo, itemId }
      });

      setFavoritos((prev) =>
        prev.filter((fav) => {
          if (tipo === "farmacia") return fav.farmacia?._id !== itemId;
          if (tipo === "remedio") return fav.remedio?._id !== itemId;
          return true;
        })
      );
    } catch (err) {
      console.error("Erro ao remover favorito:", err);
      alert("Erro ao remover.");
    }
  };

  // separar em duas listas
  const favoritosFarmacias = favoritos.filter((f) => f.farmacia);
  const favoritosRemedios = favoritos.filter((f) => f.remedio);

  return (
    <div className="modal-overlay">
      <div className="modal-container">

        <button className="btn-fechar" onClick={onClose}>X</button>
        <h2>Favoritos</h2>

        <div className="favoritos-grid">

          {/* ------------ COLUNA FARMÁCIAS ------------ */}
          <div className="favoritos-coluna">
            <h3>Farmácias</h3>

            {favoritosFarmacias.length === 0 && <p>Nenhuma farmácia favoritada.</p>}

            {favoritosFarmacias.map((fav, index) => (
              <div key={index} className="fav-item">

                <div
                  className="fav-linha clickable"
                  onClick={() => onAbrirFarmacia(fav.farmacia)}
                >
                  <span className="fav-nome">{fav.farmacia?.nome}</span>
                </div>

                <button
                  className="btn-remove"
                  onClick={() => remover("farmacia", fav.farmacia._id)}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>

          {/* ------------ COLUNA REMÉDIOS ------------ */}
          <div className="favoritos-coluna">
            <h3>Remédios</h3>

            {favoritosRemedios.length === 0 && <p>Nenhum remédio favoritado.</p>}

            {favoritosRemedios.map((fav, index) => (
              <div key={index} className="fav-item">

                <div
                  className="fav-linha clickable"
                  onClick={() => onAbrirRemedio(fav.remedio)}
                >
                  <span className="fav-nome">{fav.remedio?.nome}</span>
                </div>

                <button
                  className="btn-remove"
                  onClick={() => remover("remedio", fav.remedio._id)}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Favoritos;
