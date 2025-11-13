import React from 'react'
import '../styles/App.css'
import '../styles/components.css'
import NavBar from '../Components/NavBar'
import Btnvoltar from '../Components/Btnvoltar'

const TelaRemedio = () => {
  return (
    <div>
      <NavBar/>
      <div className="search-container">
      <input type="text" placeholder="Digite o Remédio que deseja encontrar" className="search-input" />
      <button>Pesquisar</button>
      </div>
    </div>
  )
}

export default TelaRemedio