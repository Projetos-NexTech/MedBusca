import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";

const Btnvoltar = ({ lugar }) => {
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
    <button onClick={handleClick}>{texto}</button>
  )
}

export default Btnvoltar