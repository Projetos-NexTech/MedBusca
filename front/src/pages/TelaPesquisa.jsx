import React, { useState, useEffect } from "react";
import "../styles/telapesquisa.css";
import "../styles/components.css";
import NavBar from "../Components/NavBar";
import RemedioLog from "../Components/RemedioLog";
import FarmaciaLog from "../Components/FarmaciaLog";
import { useLocation } from "react-router-dom";

const TelaPesquisa = () => {
  const [busca, setBusca] = useState("");
  const [filtroPreco, setFiltroPreco] = useState("");
  const [ordenar, setOrdenar] = useState("");
  const [categoria, setCategoria] = useState("");
  const [filtroDistancia, setFiltroDistancia] = useState("");
  const [resultados, setResultados] = useState([]);

  const [remedios, setRemedios] = useState([]);
  const [farmacias, setFarmacias] = useState([]);

  const [mensagem, setMensagem] = useState("");

  const [modalRemedio, setModalRemedio] = useState(null);
  const [modalFarmacia, setModalFarmacia] = useState(null);

  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoriaURL = params.get("categoria");

  // Atualiza os remédios sempre que resultados mudar
  useEffect(() => {
    setRemedios(resultados);
  }, [resultados]);

  // pega localização do usuário assim que o componente monta
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLat(pos.coords.latitude);
        setUserLng(pos.coords.longitude);
      },
      (err) => {
        console.warn("Geolocalização não disponível:", err);
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  // Atualiza categoria da URL
  useEffect(() => {
    if (categoriaURL) {
      setCategoria(categoriaURL);
    }
  }, [categoriaURL]);

  const buscarAPI = async (valor, tipo) => {
    try {
      const resp = await fetch(`http://localhost:5000/api/remedios/${tipo}/${valor}`);
      if (!resp.ok) throw new Error("Erro ao buscar");
      const json = await resp.json();
      setResultados(json.data);
    } catch (err) {
      console.error("Erro ao buscar remédios:", err);
    }
  };

  // Busca por categoria sempre que categoria mudar
  useEffect(() => {
    if (categoria) {
      buscarAPI(categoria, "categoria");
    }
  }, [categoria]);

  // recalcula distâncias sempre que a lista de farmácias ou a localização do usuário muda
  useEffect(() => {
    if (!userLat || !userLng || farmacias.length === 0) return;

    const atualizadas = farmacias.map((f) => {
      const latStr = f?.endereco?.latitude ?? f.latitude ?? null;
      const lonStr = f?.endereco?.longitude ?? f.longitude ?? null;

      const latNum = latStr ? Number(latStr) : null;
      const lonNum = lonStr ? Number(lonStr) : null;

      if (latNum && lonNum) {
        return {
          ...f,
          distancia: calcularDistancia(userLat, userLng, latNum, lonNum),
        };
      }
      return { ...f, distancia: null };
    });

    setFarmacias(atualizadas);
  }, [userLat, userLng]);

  const normalizarLista = (json) => {
    if (!json) return [];
    if (Array.isArray(json.data)) return json.data;
    if (Array.isArray(json)) return json;
    if (json.data && typeof json.data === "object") return [json.data];
    return [];
  };

  // Haversine - retorna número em km (float)
  const calcularDistancia = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return null;
    const R = 6371;
    const toRad = (deg) => (deg * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const km = R * c;
    return Number(km.toFixed(2));
  };

  const handlePesquisar = async () => {
    try {
      setMensagem("");
      setRemedios([]);
      setFarmacias([]);

      if (!busca && !categoria) {
        setMensagem("Por favor, insira uma busca ou categoria.");
        return;
      }

      let listaRemedios = [];
      let listaFarmacias = [];

      // buscar remédios
      if (busca.trim() !== "") {
        const res = await fetch(
          `http://localhost:5000/api/remedios/nome/${encodeURIComponent(busca.trim())}`
        );
        if (res.ok) {
          const json = await res.json();
          listaRemedios = normalizarLista(json);
        }
      } else if (categoria) {
        const res = await fetch(
          `http://localhost:5000/api/remedios/categoria/${categoria}`
        );
        if (res.ok) {
          const json = await res.json();
          listaRemedios = normalizarLista(json);
        }
      }

      // filtro preço
      if (filtroPreco) {
        listaRemedios = listaRemedios.filter((item) => {
          if (!item.preco) return false;
          if (filtroPreco === "0-20") return item.preco <= 20;
          if (filtroPreco === "20-50") return item.preco >= 20 && item.preco <= 50;
          if (filtroPreco === "50-100") return item.preco >= 50 && item.preco <= 100;
          if (filtroPreco === "100+") return item.preco >= 100;
          return true;
        });
      }

      // ordenar remédios
      if (ordenar) {
        listaRemedios = [...listaRemedios].sort((a, b) => {
          if (ordenar === "preco-asc") return a.preco - b.preco;
          if (ordenar === "preco-desc") return b.preco - a.preco;
          if (ordenar === "az") return a.nome.localeCompare(b.nome);
          if (ordenar === "za") return b.nome.localeCompare(a.nome);
          return 0;
        });
      }

      setRemedios(listaRemedios);

      // buscar farmácias pelo nome
      if (busca.trim() !== "") {
        const resF = await fetch(
          `http://localhost:5000/api/farmacias/nome/${encodeURIComponent(busca.trim())}`
        );
        if (resF.ok) {
          const jsonF = await resF.json();
          listaFarmacias = normalizarLista(jsonF);
        } else {
          listaFarmacias = [];
        }
      }

      // calcular distância se houver
      if (userLat && userLng && listaFarmacias.length > 0) {
        listaFarmacias = listaFarmacias.map((f) => {
          const latStr = f?.endereco?.latitude ?? f.latitude ?? null;
          const lonStr = f?.endereco?.longitude ?? f.longitude ?? null;

          const latNum = latStr ? Number(latStr) : null;
          const lonNum = lonStr ? Number(lonStr) : null;

          return {
            ...f,
            distancia: latNum && lonNum ? calcularDistancia(userLat, userLng, latNum, lonNum) : null,
          };
        });

        listaFarmacias.sort((a, b) => {
          const da = a.distancia ?? Infinity;
          const db = b.distancia ?? Infinity;
          return da - db;
        });
      }

      // filtro por distância
      if (filtroDistancia && listaFarmacias.length > 0) {
        listaFarmacias = listaFarmacias.filter((f) => {
          if (f.distancia == null) return false;
          if (filtroDistancia === "0-2") return f.distancia <= 2;
          if (filtroDistancia === "2-5") return f.distancia >= 2 && f.distancia <= 5;
          if (filtroDistancia === "5-10") return f.distancia >= 5 && f.distancia <= 10;
          if (filtroDistancia === "10+") return f.distancia >= 10;
          return true;
        });
      }

      setFarmacias(listaFarmacias);

      if (listaRemedios.length === 0 && listaFarmacias.length === 0) {
        setMensagem("Nenhum resultado encontrado.");
      }
    } catch (err) {
      console.error("Erro ao buscar:", err);
      setMensagem("Erro ao buscar dados.");
    }
  };

  return (
    <div className="tela-remedio">
      <NavBar />

      <div className="container-remedio">
        <h2>Pesquisar Remédios e Farmácias</h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          <select value={filtroPreco} onChange={(e) => setFiltroPreco(e.target.value)}>
            <option value="">Preço</option>
            <option value="0-20">Até R$20</option>
            <option value="20-50">R$20 a R$50</option>
            <option value="50-100">R$50 a R$100</option>
            <option value="100+">+ R$100</option>
          </select>

          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Categoria</option>
            <option value="analgesicos">Analgésicos</option>
            <option value="antibioticos">Antibióticos</option>
            <option value="vitaminas">Vitaminas</option>
            <option value="genericos">Genéricos</option>
            <option value="antialergicos">Antialérgicos</option>
          </select>

          <select
            value={filtroDistancia}
            onChange={(e) => setFiltroDistancia(e.target.value)}
          >
            <option value="">Distância</option>
            <option value="0-2">Até 2 km</option>
            <option value="2-5">2 a 5 km</option>
            <option value="5-10">5 a 10 km</option>
            <option value="10+">+ 10 km</option>
          </select>

          <select value={ordenar} onChange={(e) => setOrdenar(e.target.value)}>
            <option value="">Ordenar</option>
            <option value="preco-asc">Preço ↑</option>
            <option value="preco-desc">Preço ↓</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>

          <button onClick={handlePesquisar}>Pesquisar</button>
        </div>

        {mensagem && <p className="msg-alerta">{mensagem}</p>}

        {/* RESULTADO DA PESQUISA */}
        <h3>Resultado da Pesquisa:</h3>

        <div className="grid-remedios">
          {remedios.map((r) => (
            <div
              key={r._id}
              className="card-remedio"
              onClick={() => setModalRemedio(r)}
            >
              <h3>{r.nome}</h3>
              <p className="categoria">{r.categoria}</p>
              <p className="preco">{r.preco ? `R$ ${r.preco.toFixed(2)}` : "-"}</p>
            </div>
          ))}

          {farmacias.map((f) => (
            <div
              key={f._id}
              className="card-remedio"
              onClick={() => setModalFarmacia(f)}
            >
              <h3>{f.nome}</h3>
              <p>{f.enderecoCompleto || "Endereço não informado"}</p>
              <p>Distância: {f.distancia != null ? `${f.distancia} km` : "-"}</p>
            </div>
          ))}
        </div>
      </div>

      {modalRemedio && (
        <RemedioLog remedio={modalRemedio} onClose={() => setModalRemedio(null)} />
      )}

      {modalFarmacia && (
        <FarmaciaLog farmacia={modalFarmacia} onClose={() => setModalFarmacia(null)} />
      )}
    </div>
  );
};

export default TelaPesquisa;
