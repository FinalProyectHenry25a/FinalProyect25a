import React from 'react'
import style from './../register/Register.module.css'
import axios from "axios";
import { useState } from "react";

const Register = () => {

  const [input, setInput] = useState({

    email: "",
    password: "",
    username: "",
    firstname: "",
    lastname: "",
    address: ""

  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    await axios.post("http://localhost:3001/register", input);

    alert('User created successfully');

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
      <form onSubmit={handleSubmit}>
      <div className={style.container}>
        <div className={style.image}>
          <h1>REGISTER</h1>
        </div>
        <div>
          <input placeholder="Username..." type="text" id='username' name="username" className={style.input} required onChange={handleChange}></input>
        </div>
        <div>
          <input placeholder="Firstname..." type="text" id='firstname' name="firstname" className={style.input} required onChange={handleChange}></input>
        </div>
        <div>
          <input placeholder="Lastname..." type="text" id='lastname' name="lastname" className={style.input} required onChange={handleChange}></input>
        </div>
        <div>
          <input placeholder="Address..." type="text" id='address' name="address" className={style.input} required onChange={handleChange}></input>
        </div>
        <div>
          <input placeholder="Email..." autoFocus type="email" id='email' name="email" className={style.input} required onChange={handleChange}></input>
        </div>
        <div>
          <input placeholder="Contraseña..." type="password" id='password' name="password" className={style.input} required onChange={handleChange}></input>
        </div>
        {/* <div>
          <input placeholder="Repetir Contraseña" type="password" name="password" className={style.input} required></input>
        </div> */}
        <div className={style.register}>
          <button type='submit' className={style.btn}>Registrarse</button>
        </div>
        <div className={style.register}>
          <button className={style.btn}>Ingresar con Google</button>
        </div>
        <div>
          <button className={style.btn}>Ingresar con Github</button>
        </div>

      </div>
      </form>
    </div>
  );
}

export default Register