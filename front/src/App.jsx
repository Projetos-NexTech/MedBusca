import { Routes, Route } from "react-router-dom";
import '/src/styles/App.css'
import Perfil from "./pages/Perfil.jsx";
import TelInicial from "./pages/TelInicial.jsx";
import Login from "./pages/Login.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import TelaPesquisa from "./pages/TelaPesquisa.jsx";
import SobreNos from "./pages/SobreNos.jsx";
import Info from "./pages/info.jsx";

function App() {

  return (
   <>
    <Routes>
      <Route path="/" element={<TelInicial/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/perfil" element={<Perfil/>}/>
      <Route path="/cadastro" element={<Cadastro/>}/>
      <Route path="/tela-pesquisa" element={<TelaPesquisa/>}/>
      <Route path="/sobre-nos" element={<SobreNos/>}/>
      <Route path="/info" element={<Info/>}/>      
    </Routes>
   </>
  )
}

export default App