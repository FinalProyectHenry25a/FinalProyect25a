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

  useEffect(() => {

    setFavs(JSON.parse(localStorage.getItem("favs")))
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

      let info = await axios.get(`http://localhost:3001/user/${user.email}`);
      let userInfo = info.data;

      if (userInfo.favourites?.length === 0) {

        await axios.put(`http://localhost:3001/favourites/${userInfo.email}/${props.id}`).data;

        let phone = [props.id];
        localStorage.setItem("favs", JSON.stringify(phone));
        setFavs(JSON.parse(localStorage.getItem("favs")));

      } else if (userInfo.favourites?.find((e) => e.id === props.id)) {

        return;

      } else {

        await axios.put(`http://localhost:3001/favourites/${userInfo.email}/${props.id}`).data;

        let localStorageInfo = JSON.parse(localStorage.getItem("favs"));
        let allPhonesInLocalStorage = [...localStorageInfo, props.id];
        localStorage.setItem("favs", JSON.stringify(allPhonesInLocalStorage));
        setFavs(JSON.parse(localStorage.getItem("favs")))

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

      let localStorageInfo = JSON.parse(localStorage.getItem("favs"));
      
      let removePhoneFromLocalStorage = localStorageInfo.filter((e) => e !== props.id)

      localStorage.setItem("favs", JSON.stringify(removePhoneFromLocalStorage));
      setFavs(JSON.parse(localStorage.getItem("favs")))

        console.log("Se elimino correctamente del localStorage y Favs");

    } catch (error) {
      alert("No se pudo elimino la publicacion a favoritos.");
      console.log(error);
    }
  }

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
        <h3 className="card-title" style={{
        textAlign: 'center',
        justifyContent: "center",
      }}>{props.brand}</h3>
        <h3 style={{
        textAlign: 'center',
        justifyContent: "center",
      }}>{props.model}</h3>
        <h2 style={{
        textAlign: 'center',
        justifyContent: "center",
      }}>${props.price}</h2>
        <div className="card-text">
          {user ? favs?.includes(props.id) ? (
            <button onClick={deleteFavourites}>
              <FaHeart />
            </button>
          ) : (
            <button onClick={addToFavourites}>
              <FiHeart />
            </button>
          ): null}
          <br />
        </div>
        {props.stock > 0 ? (
          <div>
            {auth.currentUser ? (
              <Link to="#">
                <button
                  className="btn btn-outline-dark, w-100"
                  type="submit"
                  style={{
                    border: '1px solid black',
                    justifyContent: "center",
                    marginBottom: '10px'
                  }}
                  onClick={() => dispatch(addToCartUser(user.email, props.id))}
                >
                  Agregar al carrito User
                </button>
              </Link>
            ) : (
              <Link to="#">
                <button
                  className="btn btn-outline-dark, w-80"
                  type="submit"
                  style={{
                    border: '1px solid black',
                    justifyContent: "center",
                    marginLeft: '52px',
                    marginBottom: '10px'
                  }}
                  onClick={() => dispatch(addToCart(props.id))}
                >
                  Agregar al carrito
                </button>
              </Link>
            )}
            <p style={{
        textAlign: 'center',
        justifyContent: "center",
      }}>Disponibles: {props.stock}</p>
          </div>
        ) : (
          <p className="">AGOTADO</p>
        )}

        <br />
        <Link className="btn btn-outline-dark, w-100" style={{
                    border: '1px solid black',
                    justifyContent: "center",
                    
                  }} to={"/home/" + props.id}>
          Detalle
        </Link>
      </div>
    </div>
  );
}
