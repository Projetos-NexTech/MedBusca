import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Links from "../Links";
import Btnvoltar from "./Btnvoltar";

const NavBar = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se há usuário logado no localStorage
    const usuarioSalvo = localStorage.getItem("usuario");
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    setUsuario(null);
    navigate("/login"); // Redireciona para a página de login
  };

  return (
    <div className="navbar">
      <nav>
        <ul>
          <Btnvoltar lugar="navbar" />

          <li>
            <p>MedBusca</p>
          </li>

          {/* Links de navegação */}
          {Links.map(({ label, path }) => (
            <li key={path}>
              <Link to={path}>{label}</Link>
            </li>
          ))}

          {/* Exibe botão dependendo do estado de login */}
          <li className="perfil">
            {usuario ? (
              <>
                <button
                  className="perfil-btn"
                  onClick={() => navigate("/perfil")}
                >
                  <span>{usuario.nome?.charAt(0).toUpperCase() || "P"}</span>
                </button>
                <button className="logout-btn" onClick={handleLogout}>
                  Sair
                </button>
              </>
            ) : (
              <button
                className="login-btn"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
