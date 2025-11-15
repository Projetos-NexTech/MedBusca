import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";
import "../styles/components.css";

const categorias = [
  { nome: "Analgésicos", valor: "analgesicos" },
  { nome: "Antibióticos", valor: "antibioticos" },
  { nome: "Vitaminas", valor: "vitaminas" },
  { nome: "Genéricos", valor: "genericos" },
  { nome: "Antialérgicos", valor: "antialergicos" },
];

const TelInicial = () => {
  const navigate = useNavigate();
  const [farmacias, setFarmacias] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const userLat = pos.coords.latitude;
        const userLon = pos.coords.longitude;

        try {
          const res = await fetch("http://localhost:5000/api/farmacias");
          if (!res.ok) throw new Error(`Status ${res.status}`);
          const json = await res.json();

          const lista = json.data || json;

          const ordenadas = lista
            .map((f) => ({
              ...f,
              distancia: calcularDistancia(
                userLat,
                userLon,
                Number(f.latitude),
                Number(f.longitude)
              ),
            }))
            .filter((f) => typeof f.distancia === "number")
            .sort((a, b) => a.distancia - b.distancia);

          setFarmacias(ordenadas.slice(0, 4));
        } catch (err) {
          console.error("Erro ao buscar farmácias:", err);
          setErro("Erro ao carregar farmácias: " + (err.message || err));
        }
      },

      (geoError) => {
        console.error("Erro de geolocalização:", geoError);
        setErro(
          "Permita o acesso à localização no navegador para ver farmácias próximas."
        );
      },

      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  const abrirCategoria = (cat) => {
    navigate(`/tela-remedio?categoria=${cat}`);
  };

  return (
    <div className="telaInicial">
      <NavBar />

      <h2>Farmácias Próximas</h2>

      <div className="farmacias-container">
        {erro && <p className="erro">{erro}</p>}

        {!erro && farmacias.length === 0 && (
          <p className="placeholder">* Buscando farmácias próximas... *</p>
        )}

        {farmacias.map((f) => (
          <div key={f._id} className="farmacia-box">
            <h4>{f.nome}</h4>
            <p>{f.enderecoCompleto || `${f.endereco?.rua} ${f.endereco?.numero}`}</p>
            <p>
              <strong>{f.distancia.toFixed(2)} km</strong> de distância
            </p>
            <a href={f.mapsUrl} target="_blank" rel="noopener noreferrer">
              Ver no Google Maps
            </a>
          </div>
        ))}
      </div>

      <h3>Categorias de Medicamentos</h3>

      <div className="categorias-container">
        {categorias.map((item) => (
          <div
            key={item.valor}
            className="categoria-box"
            onClick={() => abrirCategoria(item.valor)}
          >
            {item.nome}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TelInicial;

// Função Haversine
function calcularDistancia(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
