import React from "react";
import { useState, useEffect } from "react";
import { getAuth, updatePassword,onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import axios from "axios";
import UserNavBar from "../UserNavBar/UserNavBar";
import BtnBack from '../back/BtnBack'
import styles from './styles/MiPerfil.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";

export default function MiPerfil() {
  const [user, setUser] = useState();

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

  /* 
  NO BORRAR!!!!!!!!!!! 

  const base64Convert = (archivos) =>{

    Array.from(archivos).forEach( archivo =>{
      let reader = new FileReader();
      reader.readAsDataURL(archivo);

      reader.onload = function(){
        let aux = [];              //corta cadena
        let base64 = reader.result;
        //console.log(base64);
        aux = base64.split(',')
        console.log(aux);
      }
    })

    <input type='file' multiple onChange={ e => base64Convert(e.target.files)}></input>
  } */


  return (
    <div>
      <UserNavBar />
      <BtnBack/>
      {user ? (
          <section>
                  <div className={styles.containerPerfil}>

                        <div className={styles.container}>
                            {user.image ? (
                              <img
                                src={user.image}
                                alt="avatar"
                                className={styles.image}
                              />
                            ) : (
                              <img
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                alt="avatar"
                                className={styles.image}
                              />
                            )}

                            <button>
                              <label htmlFor="inputarchivo" id="labelarchivo" className={styles.container2}>
                                ✏️ editar
                              </label>
                            </button>
                            <input
                              type="file"
                              id="inputarchivo"
                              name="file"
                              onChange={(ev) => base64Convert(ev)}
                              required
                              className={styles.none}
                            />
                            <br />

                            {user.image? <button onClick={removeImage}>
                              🗑️ quitar
                            </button> : null}

                      <div>
                        <h5>{user.username}</h5>
                      </div>
                      <div>
                        <p>{user.email}</p>
                      </div>
                      </div>
                  
                
                
                  
                      <div className={styles.container2}>
                      <hr/>
                        <div>
                          <p className={styles.prf}>Nombre completo:</p>
                        </div>
                        <div>
                          <p>
                            {user.firstname} {user.lastname}
                          </p>
                        </div>
                      
                      <hr />
                        <div>
                          <p className={styles.prf}>Email:</p>
                        </div>
                        <div>
                          {auth.currentUser.emailVerified ? (
                            <p>Verificado 👌</p>
                          ) : (
                            <button
                              onClick={verification}
                            >
                              Verificar ahora
                            </button>
                          )}
                        </div>
                      

                      <hr/>
                    
                        <div>
                        
                          <p className={styles.prf}>Nombre de usuario:</p>
                        </div>
                        <div>
                          <p>
                            {" "}
                            <input
                              type="text"
                              id="userName"
                              placeholder="Nuevo nombre"
                              className={styles.input}
                            />
                            <button onClick={changeUserName} className={styles.btn}>
                              Modificar
                            </button>
                          </p>
                        </div>
                      

                      <hr/>
                      
                        <div>
                          <p className={styles.prf}>Dirección:</p>
                        </div>
                        <div className={styles.containerInput}>
                          <p>
                            {" "}
                            <input
                              type="text"
                              id="address"
                              placeholder="Nueva dirección"
                              className={styles.input}
                            />
                            <button onClick={changeUserAdress} className={styles.btn}>
                              modificar
                            </button>
                          </p>
                        </div>
                      

                        <hr/>
                        <div>
                          <p className={styles.prf}>Contraseña:</p>
                        </div>

                        <div>
                          <input
                            id="pw"
                            type="password"
                            placeholder="Nueva contraseña"
                            className={styles.input}
                          />
                          <button onClick={() => changePassword()} className={styles.btn2}>
                            Modificar
                          </button>
                        </div>
                      </div>
                    </div>
          </section>
        
      ) : (
        <h1>No estas logeado</h1>
      )}
    </div>
  );
}
