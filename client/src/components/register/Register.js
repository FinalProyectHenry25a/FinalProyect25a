import React from 'react'
import style from './../register/Register.module.css'
import axios from "axios";
import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
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

  const register = async () => {

    try {

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

    } catch (error) {

      console.log(error.message);

    }

  }

  const handleChange = (e) => {

    setInput((prevState) => {

      const newState = {

        ...prevState,
        [e.target.name]: e.target.value

      };

      return newState;

    });

  }


  return (
    <div className={style.login}>
      <div className={style.container}>
        <div className={style.image}>
          <h1>Formulario de registro</h1>
        </div>
        <div>
          <input placeholder="Nombre de usuario" type="text" id='username' name="username" className={style.input} required onChange={handleChange}></input>
        </div>
        <div>
          <input placeholder="Nombre" type="text" id='firstname' name="firstname" className={style.input} required onChange={handleChange}></input>
        </div>
        <div>
          <input placeholder="Apellido" type="text" id='lastname' name="lastname" className={style.input} required onChange={handleChange}></input>
        </div>
        <div>
          <input placeholder="Dirección" type="text" id='address' name="address" className={style.input} required onChange={handleChange}></input>
        </div>
        <div>
          <input placeholder="Email" autoFocus type="email" id='email' name="email" className={style.input} required onChange={handleChange}></input>
        </div>
        <div>
          <input placeholder="Contraseña" type="password" id='password' name="password" className={style.input} required onChange={handleChange}></input>
        </div>
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