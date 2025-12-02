import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Links from "../Links";
import Btnvoltar from "./Btnvoltar";
import Btnlogout from "./Btnlogout";
import "../styles/components.css";

const NavBar = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, []);

  return (
    <div className="comp-navbar">
      <nav>
        <ul>
          <Btnvoltar estilo= "btn-voltar" lugar="navbar" />

          <li>
            <p className="titulo-navbar">MedBusca</p>
          </li>

          {Links.map(({ label, path }) => (
            <li key={path}>
              <Link to={path}>{label}</Link>
            </li>
          ))}

          <li className="nav-perfil">
            {usuario ? (
              <>
                <button
                  className="perfil-btn"
                  onClick={() => navigate("/perfil")}
                >
                  <span>
                    {usuario?.nome?.split(" ").slice(0, 2).join(" ") || "Usuário"}
                  </span>
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
