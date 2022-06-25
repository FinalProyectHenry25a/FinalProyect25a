//import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./../login/Login.module.css";
import { auth } from '../../firebase/firebase-config';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useHistory } from 'react-router-dom';


const Login = () => {

  const history = useHistory();

  const [ loginEmail, setLoginEmail ] = useState("");
  const [ loginPassword, setLoginPassword ] = useState("");

  const [ user, setUser ] = useState({});

  onAuthStateChanged(auth, (currentUser) => {

    setUser(currentUser)

  })

  const login = async () => {

    try {

      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setLoginEmail("");
      setLoginPassword("");
      history.push('/home');

    } catch (error) {

      console.log(error.message);

    }

  }

  const logout = async () => {

    await signOut(auth);

}

  const DiceSiEstaEnSesion = () => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) console.log("Sesion abierta");
      else console.log("Sesion cerrada");
    });
  };

  return (

    <div className={style.login}>
        <div className={style.container}>
          <div className={style.image}>
            <h1>LOGIN</h1>
          </div>
          <div>
          <input 
                autoFocus
                value={loginEmail}
                name="loginEmail"
                placeholder='Email...' 
                type="email" 
                id="email" 
                className={style.input}
                onChange={(e) => setLoginEmail(e.target.value) } />
          </div>
          <div>
          <input 
                value={loginPassword}
                name="loginPassword"
                placeholder='Password...'
                type="password"  
                id='password' 
                className={style.input}
                onChange={(e) => setLoginPassword(e.target.value) }/>
          </div>
          <div className={style.register}>
            <button onClick={login} type="submit" className={style.btn}>Iniciar Sesion</button>
            <Link to="register">
              <p>Registrarse</p>
            </Link>
            {/* <p>Olvide mi contraseña</p> */}
          </div>
          <h4> User Logged In: </h4>
            {user?.email}
          <button onClick={logout}> Sign Out </button>
          <button onClick={DiceSiEstaEnSesion}> tengo sesion abierta? </button>

        </div>
    </div>

  );

};

export default Login;
