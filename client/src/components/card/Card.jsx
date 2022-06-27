import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addCart } from "../../Actions";
import style from "./../card/Card.module.css";

export default function Card(props) {
  const dispatch = useDispatch()
  
  const carritoCompleto = useSelector(state=>state.cartPhones)
  function addToCart(){
  
    carritoCompleto.push(props)
    dispatch(addCart(carritoCompleto))

  }


  return (
      <div id={props.id} className={style.card}>
        <Link to={/home/ + props.id}>
      <h3>{props.brand}</h3>
      <h3>{props.model}</h3>
        <div>
        <img src={props.images} className={style.image} alt="out" />
      </div>
        <h4>{props.price}</h4>
        </Link>
        <button onClick={addToCart} type="submit">Agregar al carrito</button>
    </div>
  );
}


