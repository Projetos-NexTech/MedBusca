import React from 'react'
import NavBar from '../Components/NavBar'
import '../styles/App.css'
import '../styles/components.css'
import Btnvoltar from '../Components/Btnvoltar'

const SobreNos = () => {
  return (
    <div className='tela-sobrenos'>
        <NavBar/>
        <h1>Missão</h1>
        <p>Conectar pessoas e transformar a saúde com soluções inovadores</p>
        <h1>Visão</h1>
        <p>Ser a principal referência de tecnologia para a saúde de maneira simples e humana</p>
        <h1>Valores</h1>
        <p>Inovação continua, humanização, transparência e acessibilidade</p>
    </div>

  )
}

export default SobreNos