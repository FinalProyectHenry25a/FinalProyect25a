import React from "react";
import { useState, useEffect } from "react";
import { getAuth, updatePassword,onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import axios from "axios";
import UserNavBar from "../UserNavBar/UserNavBar";
import 'bootstrap/dist/css/bootstrap.min.css'; //s
import { useHistory } from "react-router-dom";
import { miPerfilLang } from "./styles/miPerfilLang";
import { useSelector } from "react-redux";


export default function MiPerfil() {
  const [user, setUser] = useState();
  const lan = useSelector((state) => state.language);

  const history = useHistory()

  const verification = async () => {
    alert("Correo de verifiacion enviado");

    var users = auth.currentUser;

    await sendEmailVerification(users);
  };

  useEffect(() => {
    verificarQueHayaUsuarioLogueado();
  }, []);

  const verificarQueHayaUsuarioLogueado = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        let user = await axios.get(
          `http://localhost:3001/user/${currentUser.email}`
        );
        if(user.data.banned){

          history.push("/banned")

        }
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
    window.location.reload();
  }

  async function changeUserName() {
    try {
      let b = {
        username: document.getElementById("userName").value,
        address: user.address,
        firstname: user.firstname,
        lastname: user.lastname,
      };

      await axios.put(`http://localhost:3001/user/${user.email}/edit`, b);
      alert("Actualización exitosa");
      document.getElementById("userName").value = "";
      window.location.reload();
    } catch (error) {
      alert("No se pudieron actualidar los datos");
    }
    document.getElementById("userAddress").value = "";
    verificarQueHayaUsuarioLogueado();
  }

  async function changeUserAdress() {
    try {
      let b = {
        username: user.username,
        address: document.getElementById("userAddress").value,
        firstname: user.firstname,
        lastname: user.lastname,
      };

      await axios.put(`http://localhost:3001/user/${user.email}/edit`, b);
      alert("Actualización exitosa");
      document.getElementById("userAddress").value = "";
      window.location.reload();
    } catch (error) {
      alert("No se pudieron actualidar los datos");
    }

    document.getElementById("userAddress").value = "";
    verificarQueHayaUsuarioLogueado();
  }
  const base64Convert = (ev) => {
    let file = ev.target.files[0];

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = async function () {
      let base64 = fileReader.result;
      //aca en base64 el archivo ya esta convertido a texto
     
      try {
        await axios.post("http://localhost:3001/user/cambiarImagen", {
          user: user.email,
          image: base64,
        });

        alert("Operacion exitosa");
        window.location.reload();
      } catch (error) {
        console.log(error);
        alert("No se actualizaron los datos");
      }
    };
  };

  const removeImage = async() =>{
    try {
      await axios.post("http://localhost:3001/user/cambiarImagen", {
        user: user.email,
        image: ''
      });

      alert("Imagen removida");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("No se actualizaron los datos");
    }
  }

  return (
    <div>
      <UserNavBar />

      {user ? (
        <div>
          <section>
            <div className="container py-5">
              <div className="row">
                <div className="col-lg-12 d-flex align-items-center justify-content-center">
                  <div className="w-75 p-3  card mb-4">
                    <div className="card-body text-center">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt="avatar"
                          height="100%" width="50%"
                        />
                      ) : (
                        <img
                          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                          alt="avatar"
                          className="rounded-circle img-fluid" height="100%" width="50%"
                        />
                      )}

                      <input
                        type="file"
                        id="inputarchivo"
                        name="file"
                        onChange={(ev) => base64Convert(ev)}
                        className="d-none"
                        required
                      />
                      <br />
                      <button className="btn btn-light">
                        <label htmlFor="inputarchivo" id="labelarchivo">
                          ✏️{miPerfilLang[lan].editar}
                        </label>
                      </button>

                      {user.image? <button className="btn btn-light" onClick={removeImage}>
                        🗑️{miPerfilLang[lan].quitar}
                      </button> : null}

                      <h5 className="my-3">{user.username}</h5>
                      <p className="text-muted mb-1">{user.email}</p>

                      <div className="d-flex justify-content-center mb-2"></div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 d-flex align-items-center justify-content-center">
                  <div className="w-75 p-3  card mb-4">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">{miPerfilLang[lan].nombreCompleto}</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {user.firstname} {user.lastname}
                          </p>
                        </div>
                      </div>

                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">{miPerfilLang[lan].correoElectronico}</p>
                        </div>
                        <div className="col-sm-9">
                          {auth.currentUser.emailVerified ? (
                            <p>{miPerfilLang[lan].verificado}</p>
                          ) : (
                            <button
                              className="btn btn-secondary"
                              onClick={verification}
                            >
                              {miPerfilLang[lan].verificar}
                            </button>
                          )}
                        </div>
                      </div>

                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">{miPerfilLang[lan].nombreDelUsuario}</p>
                        </div>
                        <div className="row col-sm-9">
                          <p className="text-muted mb-0">
                            {" "}
                            <input
                              className="form-control"
                              type="text"
                              id="userName"
                              placeholder="..."
                            />
                            <button
                              className="btn btn-secondary"
                              onClick={changeUserName}
                            >
                              {miPerfilLang[lan].modificar}
                            </button>
                          </p>
                        </div>
                      </div>

                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">{miPerfilLang[lan].direccion}</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {" "}
                            <input
                              className="form-control"
                              type="text"
                              id="address"
                              placeholder="..."
                            />
                            <button
                              className="btn btn-secondary"
                              onClick={changeUserAdress}
                            >
                              {miPerfilLang[lan].modificar}
                            </button>
                          </p>
                        </div>
                      </div>

                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">{miPerfilLang[lan].contraseña}</p>
                        </div>
                        <div className="col-sm-9">
                          <input
                            className="form-control"
                            id="pw"
                            type="password"
                            placeholder="..."
                          ></input>
                          <button
                            className="btn btn-secondary"
                            onClick={() => changePassword()}
                          >
                            {miPerfilLang[lan].cambiarContraseña}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <h1>{miPerfilLang[lan].noEstasLogueado}</h1>
      )}
    </div>
  );
}
