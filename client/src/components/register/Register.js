import React from 'react'
import style from './../register/Register.module.css'

const Register = () => {
  return (
    <div className={style.login}>
      <div className={style.container}>
        <div className={style.image}>
          <h1>REGISTER</h1>
        </div>
        <div>
          <input placeholder="Email" autoFocus type="email" className={style.input}></input>
        </div>
        <div>
          <input placeholder="Contraseña" type="password" className={style.input}></input>
        </div>
        <div>
          <input placeholder="Repetir Contraseña" type="password" className={style.input}></input>
        </div>
        <div className={style.register}>
          <button className={style.btn}>Registrarse</button>
        </div>
        <div className={style.register}>
          <button className={style.btn}>Ingresar con Google</button>
        </div>
        <div>
          <button className={style.btn}>Ingresar con Github</button>
        </div>

      </div>
    </div>
  );
}

export default Register