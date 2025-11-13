import { Routes, Route } from "react-router-dom";
import '/src/styles/App.css'
import DadosPerfil from "./pages/DadosPerfil.jsx";
import Perfil from "./pages/Perfil.jsx";
import TelInicial from "./pages/TelInicial.jsx";
import Login from "./pages/Login.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import TelaRemedio from "./pages/TelaRemedio.jsx";
import SobreNos from "./pages/SobreNos.jsx";

function App() {

  return (
   <>
    <Routes>
      <Route path="/" element={<TelInicial/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/perfil" element={<Perfil/>}/>
      <Route path="/dados-perfil" element={<DadosPerfil/>}/>
      <Route path="/cadastro" element={<Cadastro/>}/>
      <Route path="/tela-remedio" element={<TelaRemedio/>}/>
      <Route path="/sobre-nos" element={<SobreNos/>}/>
    </Routes>
   </>
  )
}

export default App