import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./../login/Login.module.css";
import { auth } from '../../firebase/firebase-config';
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import google from '../../images/google.png'
import logo from '../../images/smartworld.jpg'



const Login = () => {

  const history = useHistory();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {

    setUser(currentUser)

  })
  

  const login = async () => {

    try {

      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setLoginEmail("");
      setLoginPassword("");
      history.push('/home');

    } catch {

      alert ('❌ mail o contraseña incorrecta❗❗❗');

    }

  }

  const loginWithGoogle = async () => {

    try {
      let createdUser;
      const provider = new GoogleAuthProvider();
      let response = await signInWithPopup(auth, provider)
      let name = response.user.displayName.split(" ");

      if(response.user.email === "finalproyect25a@gmail.com") {

         createdUser = {

          email: response.user.email,
          username: response.user.displayName,
          address: "Sin especificar",
          firstname: name[0],
          lastname: name[1],
          isAdmin: true,
          isVerified: true
  
        }

      } else {

         createdUser = {

          email: response.user.email,
          username: response.user.displayName,
          address: "Sin especificar",
          firstname: name[0],
          lastname: name[1]
  
        }

      }

      let database = await axios.get(`http://localhost:8080/user/${response.user.email}`)
      if(database.data) {

        history.push('/home');

      } else {
      await axios.post(`http://localhost:8080/user`, createdUser);
      history.push('/home');

    }
      
    } catch (error) {

      console.log(error);

    }

  }

  useEffect(() => {

    return function () {

      setLoginEmail("");
      setLoginPassword("");
      setUser({});

    };

  }, [])

  return (

    <div className={style.login}>
      {user ? <p>Ya estas logueado weon</p> : <div className={style.container}>
        <div className={style.containerImage}>
          <div>
          <img src={logo} className={style.image} alt='logo'/>
          </div>
          <div>
          <h2>!Hola otra vez! 👋</h2>
          </div>
        </div>
        <div>
          <input
            autoFocus
            value={loginEmail}
            name="loginEmail"
            placeholder='Email'
            type="email"
            id="email"
            className={style.input}
            onChange={(e) => setLoginEmail(e.target.value)} />
        </div>
        <div>
          <input
            value={loginPassword}
            name="loginPassword"
            placeholder='Contraseña'
            type="password"
            id='password'
            className={style.input}
            onChange={(e) => setLoginPassword(e.target.value)} />
        </div>
        <a href="/identify" className={style.ancor}>Olvide mi contraseña</a>
        <div className={style.register}>
          <button onClick={login} type="submit" className={style.btn}>Ingresar</button>
          <br/><br/>
          <button onClick={loginWithGoogle} type="submit" className={style.btn}>Ingresar con Google <img src={google} alt='google' className={style.google}/></button>
          <br/><br/>
          <Link to="register">
            <p className={style.ancor2}>Registrarme</p>
          </Link>
          <Link to="home">
            <p className={style.ancor2}>Volver</p>
          </Link>
        </div>
      </div>}
    </div>

  );

};

export default Login;

