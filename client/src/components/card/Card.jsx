import React, { useEffect, useState } from "react";
//import style from "./../card/Card.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { addToCart } from "../../Actions";

export default function Card(props) {

  const [user, setUser] = useState(auth.currentUser);
  useEffect(() => {
    userVerificate();
  }, []);
  

  const userVerificate = async () => {
    await onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  };
  const dispatch = useDispatch();
  const addToFavourites = async () => {
    try {
      let add = (
        await axios.put(
          `http://localhost:3001/favourites/${user.email}/${props.id}`
        )
      ).data;
      alert("Artículo agregado a favoritos.");
      console.log(user)
    } catch (error) {
      alert("No se pudo agregar la publicacion a favoritos.");
      console.log(error);
    }
  };
   

  return (
    <div className="card" style={{width: 18 + 'rem', display: "inline-flex", flexFlow: "row wrap", justifyContent: "center"}} >
      <img src={props.images} style={{height: 300 + "px" }} alt="..." />
      <div className="card-body">
        <h3 className="card-title">{props.brand}</h3>
        <h3>{props.model}</h3>
        <div className="card-text">
          <h4>US${props.price}</h4>
          {user ? <button onClick={addToFavourites}>❤️</button> : null}
          <br />
        </div>
        <Link to="#">
          <button className="btn btn-outline-dark, w-100" type="submit"  onClick={e => dispatch(addToCart(props.id))}>Agregar al carrito</button>
        </Link>
        <br/>
        <br/>
        <Link className="btn btn-outline-dark, w-100" to={"/home/" + props.id}>Detalle</Link>
      </div>
    </div>
  );
}
