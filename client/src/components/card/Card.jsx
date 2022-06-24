import React from "react";
import style from "./../card/Card.module.css";

export default function Card(props) {
<<<<<<< HEAD
=======
  
>>>>>>> 78d611e3ca1d0f74463d2bf785e824ba40320230
  return (
      <div className={style.card}>
      <h3>{props.brand}</h3>
      <h3>{props.model}</h3>
        <div>  
        <img src={props.images} className={style.image} alt="out" />
      </div>
        <h4>{props.price}</h4>
        <button type="submit">Agregar al carrito</button>
    </div>
  );
}
