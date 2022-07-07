import React, { useEffect, useState } from "react";
//import style from "./../card/Card.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { addToCart, addToCartUser } from "../../Actions";
import soldOut from "../../images/sold-out.png";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

export default function Card(props) {
  const [user, setUser] = useState(auth.currentUser);
  const [favs, setFavs] = useState();
  const [flag, setFlag] = useState(false);
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
      let algo = await axios.get(`http://localhost:3001/user/${user.email}`);
      let usuario = algo.data;
      setUser(usuario);

      console.log(usuario);
      if (usuario.favourites?.length === 0) {
        await axios.put(`http://localhost:3001/favourites/${usuario.email}/${props.id}`).data;
        /* let guardar = localStorage.getItem("favs");
        console.log(guardar); */

        let obj = props.id;

        localStorage.setItem("favs", JSON.stringify(obj));
        setFavs(obj);
        setFlag(true);
      } else if (usuario.favourites?.find((e) => e.id === props.id)) {
        console.log("ya esta agregado");
      } else {
        console.log(`soy el false ${props.id}`);
        await axios.put(`http://localhost:3001/favourites/${usuario.email}/${props.id}`).data;
        let guardar = JSON.parse(localStorage.getItem("favs"));
        console.log(guardar);
        let obj = [guardar, props.id];
        localStorage.setItem("favs", JSON.stringify(obj));
        setFavs(obj);

        setFlag(true);
      }
    } catch (error) {
      alert("No se pudo agregar la publicacion a favoritos.");
      console.log(error);
    }
  };

  async function deleteFavourites() {
    try {
      await axios.put(
        `http://localhost:3001/favourites/delete/${user.email}/${props.id}`
      );

      let guardar = JSON.parse(localStorage.getItem("favs"));
      
      let todo = guardar.filter((e) => e !== props.id || e !== null);
      console.log(todo)
      localStorage.setItem("favs", JSON.stringify(todo));
      setFavs(todo)
    } catch (error) {
      alert("No se pudo elimino la publicacion a favoritos.");
      console.log(error);
    }
  }
  console.log(favs);

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
          {favs?.find((e) => e.includes(props.id)) ? (
            <button onClick={deleteFavourites}>
              <FaHeart />
            </button>
          ) : (
            <button value="vacio" onClick={addToFavourites}>
              <FiHeart />
            </button>
          )}
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
