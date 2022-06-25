import React, { useEffect, useState } from "react";
import style from "./../card/Card.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase/firebase-config';


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

  function addToFavourites(){
    console.log('agregado a fav');
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
