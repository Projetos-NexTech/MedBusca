import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { useNavigate } from "react-router-dom";
import FarmaciaLog from "../Components/FarmaciaLog";
import "../styles/telainicial.css";
import "../styles/components.css";
import "../styles/App.css";

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
  const [farmaciaSelecionada, setFarmaciaSelecionada] = useState(null);
  const [limite, setLimite] = useState(6);
  const [farmUser, setFarmUser] = useState({ lat: null, lon: null });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const userLat = pos.coords.latitude;
        const userLon = pos.coords.longitude;
        setFarmUser({ lat: userLat, lon: userLon });

        try {
          const res = await fetch("http://localhost:5000/api/farmacias");
          if (!res.ok) throw new Error(`Status ${res.status}`);
          const json = await res.json();
          const lista = json.data || json;

          const ordenadas = lista
            .map((f) => {
              const lat = f.endereco?.latitude;
              const lon = f.endereco?.longitude;

              if (lat && lon) {
                return {
                  ...f,
                  distancia: calcularDistancia(
                    userLat,
                    userLon,
                    Number(lat),
                    Number(lon)
                  ),
                };
              }
              return null;
            })
            .filter(f => f !== null)
            .sort((a, b) => a.distancia - b.distancia);

          setFarmacias(ordenadas);
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

  const abrirDetalhes = (farmacia) => {
    setFarmaciaSelecionada(farmacia);
  };

  return (
    <div className="tela-inicial">
      <NavBar />

      <div className="apr-inicial">
        <h1>Muito bem vindo!</h1>
        <p>Sinta-se à vontade para procurar a farmácia mais próxima de você</p>
        <p>
          Navegue até a parte inferior da página para ver as categorias de
          medicamentos mais frequentes em nossa plataforma
        </p>
        <p>
          Navegue pela barra de navegação acima para visitar as outras páginas
        </p>
      </div>

      <h2>Farmácias Próximas</h2>
      <div className="farmacias-container">
        {erro && <p className="erro">{erro}</p>}

        {!erro && farmacias.length === 0 && (
          <p className="placeholder">* Buscando farmácias próximas... *</p>
        )}

        {farmacias.slice(0, limite).map((f) => (
          <div
            key={f._id}
            className="farmacia-card"
            onClick={() => abrirDetalhes(f)}
          >
            <h4>{f.nome}</h4>
            <p>
              <strong>{f.distancia.toFixed(2)} km</strong> de distância
            </p>
          </div>
        ))}

        {farmacias.length > limite && (
          <button
            className="btn-ver-mais"
            onClick={() => setLimite(limite + 4)}
          >
            Ver mais
          </button>
        )}
      </div>

      <h3>Categorias de Medicamentos</h3>
      <div className="categorias-container">
        {categorias.map((item) => (
          <div
            key={item.valor}
            className={`categoria-box categoria-${item.valor}`}
            onClick={() => abrirCategoria(item.valor)}
          >
            {item.nome}
          </div>
        ))}
      </div>

      {farmaciaSelecionada && (
        <FarmaciaLog
          farmacia={farmaciaSelecionada}
          userLocation={farmUser}
          onClose={() => setFarmaciaSelecionada(null)}
        />
      )}
    </div>
  );
};

// Função Haversine para calcular distância
function calcularDistancia(lat1, lon1, lat2, lon2) {
  const R = 6371;
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

export default TelInicial;
