import React from 'react'
import './Auth.css'

import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react'

const Register = () => {

  const handleSubmit = (e)=>{
    e.preventDefault();

  }

  return (
    <div id="register">
      <h2>ReactGram</h2>
      <p className='subtitle'>Cadastre-se para ver as fotos dos seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <input type="text"placeholder='Nome' />
        <input type="text"placeholder='E-mail' />
        <input type="password"placeholder='Senha' />
        <input type="password"placeholder='Confirmar Senha' />
        <input type="submit" value="Cadastrar" />

        <p>
          Já tem conta? <Link to='/login'>Clique aqui.</Link>
        </p>
      </form>
    </div>
  )
}

export default Register
