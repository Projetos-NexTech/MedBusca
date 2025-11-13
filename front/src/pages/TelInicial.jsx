import React from 'react'
import NavBar from '../Components/NavBar'
import '../styles/App.css'
import '../styles/components.css'

const TelInicial = () => {
  return (
    <div className='telaInicial'>
      <NavBar/>

      <h2>Farmacias Próximas</h2>
      <p>*componente pra por as farmacias proximas*</p>
      <h3>Conheça os medicamentos</h3>
      <p>*Categorias de medicamento pra direcionar pra tela de pesquisa*</p>
    </div>
  )
}

export default TelInicial