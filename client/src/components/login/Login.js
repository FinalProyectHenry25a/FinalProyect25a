import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./../login/Login.module.css";
import { auth } from "../../firebase/firebase-config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { BsGoogle } from "react-icons/bs"

const Login = () => {
  const history = useHistory();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setLoginEmail("");
      setLoginPassword("");
      history.push("/home");
    } catch {
      alert("❌ mail o contraseña incorrecta❗❗❗");
    }
  };

  const loginWithGoogle = async () => {
    try {
      let createdUser;
      const provider = new GoogleAuthProvider();
      let response = await signInWithPopup(auth, provider);
      let name = response.user.displayName.split(" ");

      if (response.user.email === "finalproyect25a@gmail.com") {
        createdUser = {
          email: response.user.email,
          username: response.user.displayName,
          address: "Sin especificar",
          firstname: name[0],
          lastname: name[1],
          isAdmin: true,
          isVerified: true,
        };
      } else {
        createdUser = {
          email: response.user.email,
          username: response.user.displayName,
          address: "Sin especificar",
          firstname: name[0],
          lastname: name[1],
        };
      }

      let database = await axios.get(
        `http://localhost:3001/user/${response.user.email}`
      );
      if (database.data) {
        history.push("/home");
      } else {
        await axios.post(`http://localhost:3001/user`, createdUser);
        history.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    return function () {
      setLoginEmail("");
      setLoginPassword("");
      setUser({});
    };
  }, []);

  return (
    /*  <div className={style.login}>
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
    </div> */

    <section className="vh-100" style={{ background: "#010101" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5" style={{ background: "#171717" }}>
            <div
              className="card shadow-2-strong"
              style={{ borderRadius: 1 + "rem", background: "#171717"}}
            >
              <div className="card-body p-5 text-center">
                <h3 className="mb-5" style={{color: "white"}}>Sign in</h3>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="typeEmailX-2"
                    className="form-control form-control-lg"
                    style={{border: "none" }}
                    placeholder="Email"
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="typePasswordX-2"
                    className="form-control form-control-lg"
                    placeholder="Password"
                  />
                </div>

                {/*Checkbox*/}
                <div className="form-check d-flex justify-content-start mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="form1Example3"
                  />
                  <label className="form-check-label" for="form1Example3">
                    {" "}
                    Remember password{" "}
                  </label>
                </div>

                <button
                  className="btn btn-primary btn-lg btn-block"
                  type="submit"
                >
                  Login
                </button>

                <hr className="my-4" style={{color: "white"}} />

                <div className="d-grid rounded-pill" style={{height: 30 + "%", width: 100 + "%", textAlign: "center"}} data-ng-show="vm.continueWith3rdParty == 'GG'">
                  <button className="btn btn-primary" style={{fontSize: 17 + "px", background:"#5D5D5D", border: "none", textAlign: "center" }} onClick={loginWithGoogle} type="submit">
                    <BsGoogle style={{display: "inline-flex", justifyContent: "flex-start", fontSize: 20 + "px" }}/> Iniciar sesión con Google
                  </button>
                </div>
                <br/>
                <div className="text-center">
                  <p>
                    No estas registrado? <a href="/register">Register</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
