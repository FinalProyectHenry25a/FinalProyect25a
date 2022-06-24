import React from "react";
import { Link } from "react-router-dom";
import style from "./../login/Login.module.css";

const Login = () => {
  return (
    <div className={style.login}>
      <form action="/login" method="POST">
      <div className={style.container}>
        <div className={style.image}>
          <h1>LOGIN</h1>
        </div>
        <div>
          <input placeholder="Email" name="email" autoFocus type="email" className={style.input}></input>
        </div>
        <div>
          <input placeholder="Contraseña" name="password" type="password" className={style.input}></input>
        </div>
        <div className={style.register}>
          <button type="submit" className={style.btn}>Iniciar Sesion</button>
          <Link to="register">
          <p>Registrarse</p>
          </Link>
          <p>Olvide mi contraseña</p>
        </div>
      </div>
      </form>
    </div>
  );
};

export default Login;
