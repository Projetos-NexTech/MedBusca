import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Btnvoltar from "../Components/Btnvoltar";
import Favoritos from "../Components/Favoritos";
import FarmaciaLog from "../Components/FarmaciaLog";
import RemedioLog from "../Components/RemedioLog";
import DadosPerfil from "../Components/DadosPerfil";
import Btnlogout from "../Components/Btnlogout";
import api from "../service/api";
import "../styles/perfil.css";
import "../styles/components.css";

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);
  const [mostrarDados, setMostrarDados] = useState(false);
  const [farmaciaSelecionada, setFarmaciaSelecionada] = useState(null);
  const [remedioSelecionado, setRemedioSelecionado] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: null, lon: null });

  // Buscar informações do usuário
  const recarregarDados = () => {
    const id = localStorage.getItem("usuarioId");
    api
      .get(`/api/usuarios/${id}`)
      .then((res) => setUsuario(res.data.data))
      .catch((err) => console.error("Erro ao recarregar dados:", err));
  };

  useEffect(() => {
    const id = localStorage.getItem("usuarioId");
    if (!id) return;

    api
      .get(`/api/usuarios/${id}`)
      .then((res) => setUsuario(res.data.data))
      .catch((err) => console.error("Erro ao buscar usuário:", err));

    // Capturar localização do usuário
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => console.error("Erro ao pegar localização:", err)
    );
  }, []);

  const getAvatar = () => {
    if (!usuario || !usuario.nome) return "";
    const partes = usuario.nome.trim().split(" ");
    if (partes.length === 1) return partes[0][0].toUpperCase();
    return (partes[0][0] + partes[1][0]).toUpperCase();
  };

  // Abrir farmácia selecionada (tanto da lista quanto do favoritos)
  const abrirFarmacia = async (farm) => {
    try {
      const resp = await api.get(`/api/farmacias/${farm._id}`);
      setFarmaciaSelecionada(resp.data.data);
    } catch {
      setFarmaciaSelecionada(farm);
    }
  };

  return (
    <div className="tela-perfil">
      <NavBar />

      <div className="perfil-container">
        <h2>Meu Perfil</h2>

        {usuario && <div className="avatar-perfil">{getAvatar()}</div>}

        {usuario ? (
          <div className="perfil-info">
            <p>
              <strong>Nome:</strong> {usuario.nome}
            </p>
            <p>
              <strong>E-mail:</strong> {usuario.email}
            </p>
            <br />
            <button
              className="btn-favoritos"
              onClick={() => setMostrarFavoritos(true)}
            >
              Ver Favoritos
            </button>

            <button
              className="btn-favoritos"
              onClick={() => setMostrarDados(true)}
            >
              Editar Perfil
            </button>

            <Btnlogout className="logout-btn" />
          </div>
        ) : (
          <p>Carregando informações...</p>
        )}

        {/* Modal Favoritos */}
        {mostrarFavoritos && (
          <Favoritos
            usuarioId={localStorage.getItem("usuarioId")}
            onClose={() => setMostrarFavoritos(false)}
            onAbrirFarmacia={abrirFarmacia}
            onAbrirRemedio={(remedio) => setRemedioSelecionado(remedio)}
            userLocation={userLocation} // Passa a localização
          />
        )}

        {/* Modal FarmaciaLog */}
        {farmaciaSelecionada && (
          <FarmaciaLog
            farmacia={farmaciaSelecionada}
            userLocation={userLocation} // Passa a localização
            onClose={() => setFarmaciaSelecionada(null)}
          />
        )}

        {/* Modal RemedioLog */}
        {remedioSelecionado && (
          <RemedioLog
            remedio={remedioSelecionado}
            onClose={() => setRemedioSelecionado(null)}
          />
        )}
      </div>

      {/* Modal DadosPerfil */}
      {mostrarDados && (
        <DadosPerfil
          usuario={usuario}
          onClose={() => setMostrarDados(false)}
          onAtualizado={recarregarDados}
        />
      )}
    </div>
  );
};

export default Perfil;
