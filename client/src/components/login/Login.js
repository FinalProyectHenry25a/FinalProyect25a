import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./../login/Login.module.css";
import { auth } from '../../firebase/firebase-config';
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { useSelector } from "react-redux";
import { BsWindowSidebar } from "react-icons/bs";


const Login = () => {

  const cart = useSelector(state => state.cart)

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

      for (let i = 0; i < cart.length; i++) {
          
        await axios.put(`http://localhost:3001/cart/${auth.currentUser.email}/${cart[i].id}`)
        
      }

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

      let database = await axios.get(`http://localhost:3001/user/${response.user.email}`)
      if(database.data) {

        for (let i = 0; i < cart.length; i++) {
          
          await axios.put(`http://localhost:3001/cart/${response.user.email}/${cart[i].id}`)
          
        }

        history.push('/home');

      } else {

      await axios.post(`http://localhost:3001/user`, createdUser);

      for (let i = 0; i < cart.length; i++) {
          
        await axios.put(`http://localhost:3001/cart/${response.user.email}/${cart[i].id}`)
        
      }

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
            onChange={(e) => setLoginEmail(e.target.value)} />
        </div>
        <div>
          <input
            value={loginPassword}
            name="loginPassword"
            placeholder='Password...'
            type="password"
            id='password'
            className={style.input}
            onChange={(e) => setLoginPassword(e.target.value)} />
        </div>
        <a href="/identify">¿Olvidaste tu contraseña?</a>
        <div className={style.register}>
          <button onClick={login} type="submit" className={style.btn}>Iniciar Sesion</button>
          <br/><br/>
          <button onClick={loginWithGoogle} type="submit" className={style.btn}>Iniciar Sesion con Google</button>
          <br/><br/>
          <Link to="register">
            <p>Registrarse</p>
          </Link>
          <Link to="home">
            <p>Home</p>
          </Link>
        </div>
      </div>}
    </div>

  );

};

export default Login;

