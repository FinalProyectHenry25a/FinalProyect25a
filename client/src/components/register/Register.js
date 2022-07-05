import React, { useEffect, useState } from 'react'
import style from './../register/Register.module.css'
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/firebase-config';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchstoken } from "../Contacto/fetchmetod";
import Swal from 'sweetalert2';
import swal2 from 'sweetalert'
import {Link} from 'react-router-dom';




const Register = () => {

  const cart = useSelector(state => state.cart)
  
  const history = useHistory();
  
  const [input, setInput] = useState({
    
    email: "",
    password: "",
    username: "",
    firstname: "",
    lastname: "",
    address: ""
    
  });
  const [correo, SetCorreo] = useState({
    contact_user: "Henry Commerse",
    correo_user: "",
    asunto_user:"Estas registrado",
    descripcion_user:"Bienvenido a Henry Commerse, ya estas registrado. Dirigete a mi perfil y solicita el mail de verificación para verificar tu cuenta y poder comprar en nuestra pagina.",
  })  

  const [error,setError] = useState({}) 
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
        contact_user: "Henry Commerse",
        correo_user:"",
        asunto_user:"Estas registrado",
        descripcion_user:"Bienvenido a Henry Commerse, ya estas registrado. Dirigete a mi perfil y solicita el mail de verificación para verificar tu cuenta y poder comprar en nuestra pagina.", 
      });
    } catch (error) {
      Toast.fire({
        icon: 'error',
        title: error.message
      })
    }
  }

  const register = async () => {

    if (
      error.email ||
      error.password ||
      error.username ||
      error.firstname ||
      error.lastname ||
      error.address 
   ){alert ("No se pudo registrar correctamente, revisa bien los campos")
  } else {
        await createUserWithEmailAndPassword(auth, input.email, input.password);
        const newUser = {
          email: input.email,
          username: input.username,
          firstname: input.firstname,
          lastname: input.lastname,
          address: input.address
        }
        await axios.post("http://localhost:3001/user", newUser);

        for (let i = 0; i < cart.length; i++) {
          
          await axios.put(`http://localhost:3001/cart/${auth.currentUser.email}/${cart[i].id}`)
          
        }

        setInput({

          email: "",
          password: "",
          username: "",
          firstname: "",
          lastname: "",
          address: ""

        });
      
      // swal('Buen Trabajo','Te registraste correctamente!', "Ver productos");
      swal2({
        title: "Buen Trabajo!",
        text: "Te registraste correctamente!",
        icon: "success",
      });

      history.push('/home');

    } 

  }

  function validation (input){
    let error = {}
    if (!input.email) error.email = "Ingresa el email del usuario"
    if (!input.password) error.password = "Ingresa la contraseña del usuario"
    if (!input.username) error.username = "Ingresa el nombre de usuario"
    if (!input.firstname) error.firstname = "Ingresa el nombre del usuario"
    if (!input.lastname) error.lastname = "Ingresa el apellido del usuario"
    if (!input.address) error.address = "Ingresa la direccion del usuario"
    return error
  }

const handleChange = (e) => {
  
  setInput((prevState) => {
    
        const newState = {

          ...prevState,
          [e.target.name]: e.target.value

        };
        setError(validation({
          ...prevState,
          [e.target.name]: e.target.value
        }))
        
        return newState;
        
      });
      
    }

    const handleChangeEmail = (e) => {
  
      setInput({
        ...input,
        email: e.target.value
    })
    
  }
  
  console.log(input)
    const onChangeCorreo = (e) => {
      const { name, value } = e.target;
      SetCorreo({
        ...correo,
        correo_user: value,
      })
     }
    
    // useEffect(() => {
      
      //    return function () {
        
        //     console.log("ESTOY DESMONTANDO");
        //      setInput({}); 
        
        //    };
        
        // },[input])
        const DOS = (e) => {
          correoEmail(e);
          register();
        }
        
        
        return (
          <div className={style.login}>
      <div className={style.container}>
        <div className={style.image}>
          <h1>Formulario de registro</h1>
        </div>
        <div>
          <input placeholder="Username..." type="text" id='username' name="username" className={style.input} required onChange={handleChange}></input>
        {error.username && <p>{error.username}</p>}</div>
        <div>
          <input placeholder="Firstname..." type="text" id='firstname' name="firstname" className={style.input} required onChange={handleChange}></input>
        {error.firstname && <p>{error.firstname}</p>}</div>
        <div>
          <input placeholder="Lastname..." type="text" id='lastname' name="lastname" className={style.input} required onChange={handleChange}></input>
        {error.lastname && <p>{error.lastname}</p>}</div>
        <div>
          <input placeholder="Address..." type="text" id='address' name="address" className={style.input} required onChange={handleChange}></input>
        {error.address && <p>{error.address}</p>}</div>
        {/* <div>
          <input placeholder="Email..." autoFocus type="email" id='email' name="email" required onChange={handleChange}></input>
          {error.email && <p>{error.email}</p>}</div> */}
        <div>
        <input type='email' name="correo_user" placeholder="Email..." className={style.input} value={correo.correo_user} onChange={ (e) => { {onChangeCorreo(e)} {handleChangeEmail(e)} } }/>
        </div>
        <div>
          <input placeholder="Contraseña..." type="password" id='password' name="password" className={style.input} required onChange={handleChange}></input>
        {error.password && <p>{error.password}</p>}</div>
        {/* <div>
          <input placeholder="Repetir Contraseña" type="password" name="password" className={style.input} required></input>
        </div> */}
        <div className={style.register}>
          <button onClick={DOS} type='submit' className={style.btn}>Registrarse</button>
        </div>
        <Link to="login">
            <p className={style.ancor}>Volver</p>
          
          </Link>
        {/* <div className={style.register}>
          <button className={style.btn}>Ingresar con Google</button>
        </div>
        <div>
          <button className={style.btn}>Ingresar con Github</button>
        </div> */}

      </div>
    </div>
  );
}

export default Register
