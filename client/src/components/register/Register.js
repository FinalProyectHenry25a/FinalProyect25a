import React, { useEffect } from 'react'
import style from './../register/Register.module.css'
import axios from "axios";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/firebase-config';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import swal from 'sweetalert';


const Register = () => {

  const history = useHistory();

  const [input, setInput] = useState({

    email: "",
    password: "",
    username: "",
    firstname: "",
    lastname: "",
    address: ""

  });

  const [error,setError] = useState({}) 

  const register = async () => {

    if (
      error.email ||
      error.password ||
      error.username ||
      error.firstname ||
      error.lastname ||
      error.address 
   ){alert ("No se creo la publicacion, revisa bien los campos weon")
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
        setInput({

          email: "",
          password: "",
          username: "",
          firstname: "",
          lastname: "",
          address: ""

        });
      
      // swal('Buen Trabajo','Te registraste correctamente!', "Ver productos");
      swal({
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

    // useEffect(() => {

    //    return function () {

    //     console.log("ESTOY DESMONTANDO");
    //      setInput({}); 

    //    };

    // },[input])


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
        <div>
          <input placeholder="Email..." autoFocus type="email" id='email' name="email" className={style.input} required onChange={handleChange}></input>
          {error.email && <p>{error.email}</p>}</div>
        <div>
          <input placeholder="Contraseña..." type="password" id='password' name="password" className={style.input} required onChange={handleChange}></input>
        {error.password && <p>{error.password}</p>}</div>
        {/* <div>
          <input placeholder="Repetir Contraseña" type="password" name="password" className={style.input} required></input>
        </div> */}
        <div className={style.register}>
          <button onClick={register} type='submit' className={style.btn}>Registrarme</button>
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
