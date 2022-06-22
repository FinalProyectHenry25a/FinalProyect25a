import React from "react";
import style from "./../card/Card.module.css";

export default function Card(props) {
  console.log(props);
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
