import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/components.css";

const Btnvoltar = ({ lugar, estilo}) => {
   const navigate = useNavigate();
   const location = useLocation();
   let texto = "Voltar";
  
    if ( lugar === "navbar"){
      texto = "←"
    }
  
   function handleClick() {
     if (location.pathname === "/login") {
      navigate("/"); 
    } else {
      navigate(-1); 
    }
  };

  
  return (
    <button className= {estilo} onClick={handleClick}>{texto}</button>
  )
}

export default Btnvoltar