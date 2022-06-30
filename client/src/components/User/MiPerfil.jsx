import React from "react";
import { useState, useEffect } from "react";
import { getAuth, updatePassword,onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import axios from "axios";
import UserNavBar from "../UserNavBar/UserNavBar";

export default function MiPerfil() {

  const [user, setUser] = useState();

  const verification = async () => {

    alert("Correo de verifiacion enviado");

    var users = auth.currentUser;

    await sendEmailVerification(users)

  }

  

  useEffect(() => {
    verificarQueHayaUsuarioLogueado();
  }, []);

  const verificarQueHayaUsuarioLogueado = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        let user = await axios.get(
          `http://localhost:3001/user/${currentUser.email}`
        );
        setUser(user.data);
      }
    });
  };

  async function changePassword() {
    let newPw = document.getElementById("pw").value;

    const authh = await getAuth();
    const user = authh.currentUser;

    await updatePassword(user, newPw)
      .then(() => {
        alert("La contraseña se actualizo correctamente");
      })
      .catch((error) => {
        alert("No se ha podido restablecer contraseña");
      });

    document.getElementById("pw").value = "";
  }

  async function changeUserName() {

    try {
      let b = {
        username: document.getElementById("userName").value,
        address: user.address,
        firstname: user.firstname,
        lastname: user.lastname,
      };

      const changed = await axios.put(
        `http://localhost:3001/user/${user.email}/edit`,
        b
      );
      alert("Actualización exitosa");
    } catch (error) {
      alert("No se pudieron actualidar los datos");
    }

    document.getElementById("userName").value = "";
    verificarQueHayaUsuarioLogueado()
  }

  async function changeUserAdress() {
    try {
      let b = {
        username: user.username,
        address: document.getElementById("userAddress").value,
        firstname: user.firstname,
        lastname: user.lastname,
      };

      const changed = await axios.put(
        `http://localhost:3001/user/${user.email}/edit`,
        b
      );
      alert("Actualización exitosa");
    } catch (error) {
      alert("No se pudieron actualidar los datos");
    }

    document.getElementById("userAddress").value = ""
    verificarQueHayaUsuarioLogueado();
  }

  return (
    <div>
      <UserNavBar />
      {user ? (
        <div>
          <h1>Mis datos</h1>
          <br />

          <div>
            <h5>E-mail:</h5>
            <p>{user.email}</p>
          {auth.currentUser.emailVerified ? <p>Mail ya verificado</p> :<button onClick={verification}>verificar email</button>}
            <br/><br/>
          </div>
        
          <div>
          
          
          </div>
          <div>
          
          
         
          </div>

          <div>
            <h5>Nombre de usuario:</h5>
            <p>{user.username}</p>
            <input type="text" id="userName" placeholder="..." />
            <button onClick={changeUserName}>modificar</button>
            <br />
            <br />
          </div>

          <div>
            <h5>Direccion actual:</h5>
            <p>{user.address}</p>
            <input id="userAddress" type="text" placeholder="..." />
            <button onClick={changeUserAdress}>modificar</button>
            <br />
            <br />
          </div>

          <div>
            <br />
            <h5>Cotraseña:</h5>
            <input id="pw" type="password" placeholder="..."></input>
            <button onClick={() => changePassword()}>Cambiar contraseña</button>
            <br />
          </div>
        </div>
      ) : (
        <h1>no estas logeado</h1>
      )}
    </div>
  );
}
