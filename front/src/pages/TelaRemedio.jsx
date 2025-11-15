import React, { useState, useEffect } from "react";
import "../styles/App.css";
import "../styles/components.css";
import NavBar from "../Components/NavBar";
import { useLocation } from "react-router-dom";

const TelaRemedio = () => {
  const [busca, setBusca] = useState("");
  const [filtroPreco, setFiltroPreco] = useState("");
  const [ordenar, setOrdenar] = useState("");
  const [remedios, setRemedios] = useState([]);
  const [mensagem, setMensagem] = useState(""); 

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoriaURL = params.get("categoria");

  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    if (categoriaURL) {
      setCategoria(categoriaURL);
      handlePesquisar(categoriaURL);
    }
  }, [categoriaURL]);

  const normalizarLista = (json) => {
    if (!json) return [];
    if (Array.isArray(json)) return json;
    if (Array.isArray(json.data)) return json.data;
    if (typeof json.data === "object") return [json.data];
    if (typeof json === "object") return [json];
    return [];
  };

  const handlePesquisar = async (catFromUrl = null) => {
    try {
      setMensagem("");

      if (
        busca.trim() === "" &&
        filtroPreco === "" &&
        ordenar === "" &&
        categoria === "" &&
        !catFromUrl
      ) {
        setRemedios([]);
        setMensagem("Por favor, insira informações sobre o remédio desejado.");
        return;
      }

      let lista = [];
      let url = "http://localhost:5000/api/remedios";

      
      if (busca.trim() !== "") {
        url = `http://localhost:5000/api/remedios/nome/${busca.trim()}`;
      }

      else if (categoria || catFromUrl) {
        const cat = catFromUrl || categoria;
        url = `http://localhost:5000/api/remedios/categoria/${cat}`;
      }

      const res = await fetch(url);
      const json = await res.json();

      lista = normalizarLista(json);

    
      if (filtroPreco) {
        lista = lista.filter((item) => {
          if (!item.preco) return false;
          if (filtroPreco === "0-20") return item.preco <= 20;
          if (filtroPreco === "20-50") return item.preco >= 20 && item.preco <= 50;
          if (filtroPreco === "50-100") return item.preco >= 50 && item.preco <= 100;
          if (filtroPreco === "100+") return item.preco >= 100;
          return true;
        });
      }

      
      if (ordenar) {
        lista = [...lista].sort((a, b) => {
          if (ordenar === "preco-asc") return a.preco - b.preco;
          if (ordenar === "preco-desc") return b.preco - a.preco;
          if (ordenar === "az") return a.nome.localeCompare(b.nome);
          if (ordenar === "za") return b.nome.localeCompare(a.nome);
          return 0;
        });
      }

      setRemedios(lista);
      if (lista.length === 0) setMensagem("Nenhum remédio encontrado.");
    } catch (err) {
      console.error("Erro ao buscar remédios:", err);
      setMensagem("Erro ao buscar remédios.");
    }
  };

  return (
    <div className="tela-remedio">
      <NavBar />

      <div className="container-remedio">
        <h2>Buscar Remédios</h2>

       
        <div className="search-area">
          <input
            type="text"
            className="search-input"
            placeholder="Digite o nome do remédio"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          <select
            className="search-select"
            value={filtroPreco}
            onChange={(e) => setFiltroPreco(e.target.value)}
          >
            <option value="">Filtrar por preço</option>
            <option value="0-20">Até R$20</option>
            <option value="20-50">R$20 a R$50</option>
            <option value="50-100">R$50 a R$100</option>
            <option value="100+">Acima de R$100</option>
          </select>

          <select
            className="search-select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Categoria</option>
            <option value="analgesicos">Analgésicos</option>
            <option value="antibioticos">Antibióticos</option>
            <option value="vitaminas">Vitaminas</option>
            <option value="genericos">Genéricos</option>
            <option value="antialergicos">Antialérgicos</option>
          </select>

          <select
            className="search-select"
            value={ordenar}
            onChange={(e) => setOrdenar(e.target.value)}
          >
            <option value="">Ordenar por</option>
            <option value="preco-asc">Preço (menor → maior)</option>
            <option value="preco-desc">Preço (maior → menor)</option>
            <option value="az">Nome (A-Z)</option>
            <option value="za">Nome (Z-A)</option>
          </select>

          <button className="btn-pesquisar" onClick={() => handlePesquisar()}>
            Pesquisar
          </button>
        </div>

       
        {mensagem && <p className="msg-alerta">{mensagem}</p>}

       
        <div className="resultado-grid">
          {remedios.map((r) => (
            <div key={r._id} className="remedio-card">
              <h3>{r.nome}</h3>

              <p className="descricao">{r.descricao}</p>

              <p><strong>Categoria:</strong> {r.categoria}</p>

              <p>
                <strong>Preço:</strong>{" "}
                {r.preco ? `R$ ${r.preco.toFixed(2)}` : "-"}
              </p>

             //verificar se esta de fato funcionando e fazer a tela própria para o remédio
             
              {r.farmacia && (
                <>
                  <p><strong>Farmácia:</strong> {r.farmacia.nome}</p>

                  {r.farmacia.link && (
                    <a
                      href={r.farmacia.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="farmacia-link"
                    >
                      Visitar farmácia
                    </a>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TelaRemedio;
