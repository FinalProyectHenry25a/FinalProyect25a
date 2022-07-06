import React, { useEffect, useState } from "react";
//import style from "./../card/Card.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { addToCart, addToCartUser } from "../../Actions";
import soldOut from "../../images/sold-out.png";

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
      console.log(user);
    } catch (error) {
      alert("No se pudo agregar la publicacion a favoritos.");
      console.log(error);
    }
  };

  return (
    <div
      className="card"
      style={{
        width: 18 + "rem",
        display: "inline-flex",
        flexFlow: "row wrap",
        justifyContent: "center",
      }}
    >
      <div style={{ height: 300 + "px" }}>
        {props.stock > 0 ? (
          <img src={props.images} style={{ height: 300 + "px" }} alt="..." />
        ) : (
          <img src={soldOut} style={{ height: 200 + "px" }} alt="..." />
        )}
      </div>
      <div className="card-body">
        <h3 className="card-title">{props.brand}</h3>
        <h3>{props.model}</h3>
        <div className="card-text">
          {user ? <button onClick={addToFavourites}>❤️</button> : null}
          <br />
        </div>
        {props.stock > 0 ? (
          <div>
            {auth.currentUser ? (
              <Link to="#">
                <button
                  className="btn btn-outline-dark, w-100"
                  type="submit"
                  onClick={() => dispatch(addToCartUser(user.email, props.id))}
                >
                  Agregar al carrito User
                </button>
              </Link>
            ) : (
              <Link to="#">
                <button
                  className="btn btn-outline-dark, w-100"
                  type="submit"
                  onClick={() => dispatch(addToCart(props.id))}
                >
                  Agregar al carrito
                </button>
              </Link>
            )}
            <p>Disponibles: {props.stock}</p>
          </div>
        ) : (
          <p className="">AGOTADO</p>
        )}

        <br />
        <Link className="btn btn-outline-dark, w-100" to={"/home/" + props.id}>
          Detalle
        </Link>
      </div>
    </div>
  );
}
