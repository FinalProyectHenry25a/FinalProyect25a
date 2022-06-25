import React, { useEffect, useState } from "react";
import style from "./../card/Card.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase/firebase-config';
import axios from "axios";


export default function Card(props) {

  const [user, setUser] = useState (auth.currentUser)
  useEffect(()=>{
    userVerificate();
  },[])



  const userVerificate = async() => {
    await onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    });
  };

  const addToFavourites = async() => {
    try {
      let add = (await axios.put(`http://localhost:3001/favourites/${user.email}/${props.id}`)).data
      alert ('Artículo agregado a favoritos.')
      
    } catch (error) {
      alert("No se pudo agregar la publicacion a favoritos.");
      console.log(error);
    }
  }

  return (
      <div className={style.card}>
      <h3>{props.brand}</h3>
      <h3>{props.model}</h3>
        <div>  
        <img src={props.images} className={style.image} alt="out" />
      </div>
        <h4>{props.price}</h4>
        {user ? <button onClick={addToFavourites}>❤️</button> : null}
        <br/>
        <button type="submit">Agregar al carrito</button>
    </div>
  );
}
