import axios from "axios";
import React, { useEffect, useState } from "react";
import { fetchstoken } from "./fetchmetod";
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";



export default function Contacto () {

    const history = useHistory()

    const [correo, SetCorreo] = useState({
      contact_user: "",
      correo_user:"",
      asunto_user:"",
      descripcion_user:"",
    })

const onChangeCorreo = (e) => {
    const { name, value } = e.target;
    SetCorreo({
      ...correo,
      [name]: value,
    })
   }


const correoEmail = async(e) =>{
    e.preventDefault();
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) =>{
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
    try{
      const resultCorreo = await fetchstoken('correo', correo , "POST");
      console.log(resultCorreo);
      if(!resultCorreo.ok){
        throw Error(resultCorreo.errors.msg);
      }
      Toast.fire({
        icon: 'success',
        title: 'El correo se envio con exito'
      });
      SetCorreo({
        contact_user: "",
        correo_user:"",
        asunto_user:"",
        descripcion_user:"", 
      });
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: error.message
      })
    }
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
        if(user.data.banned){

          history.push("/banned")

        }
      }
    });
  };


return(
    <div>

<h3>Contactar</h3>
      <div>
        <h3>Llamanos: </h3>
        <p>+54 9 236 470-3985</p>
        <h3>Ubicacion:</h3>
        <p>Av. del Libertador 3724, CABA</p>
        <h3>Horarios de Trabajo: </h3>
        <p>Lunes a Viernes, 8 A.M - 6 P.M</p>
      </div>

      <form name="formulario-contacto" onSubmit={correoEmail}>
        <label name='nombre'>Nombre:</label>
        <input type='text' name="contact_user" placeholder="Ingresa tu Nombre" value={correo.contact_user} onChange={onChangeCorreo}/>
        <label>Correo Electronico:</label>
        <input type='email' name="correo_user" placeholder="Ingresa tu Correo" value={correo.correo_user} onChange={onChangeCorreo}/>
        <label>Asunto:</label>
        <input type='text' name="asunto_user" placeholder="Asunto" value={correo.asunto_user} onChange={onChangeCorreo}/>
        <label>Descripcion:</label>
        <textarea name="descripcion_user" placeholder="Descripcion" value={correo.descripcion_user} onChange={onChangeCorreo}/>
        <button type='submit'>Enviar</button>
      </form>
    </div>
)}

