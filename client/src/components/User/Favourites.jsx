import React from "react";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import axios from "axios";
import Card from "../card/Card";
import UserNavBar from "../UserNavBar/UserNavBar";
import { Link, useHistory } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addToCartUser, addToCart, addFav, getLocalFavs } from "../../Actions";
import { useParams } from "react-router-dom";

export default function Favourites(props) {
  const [user, setUser] = useState();
  const history = useHistory()
  const dispatch = useDispatch();
  const { id } = useParams();
  const favs = useSelector(state => state.favs)

  let emailUser = "";
  useEffect(() => {
    verificarQueHayaUsuarioLogueado();
  }, [favs]);

  const verificarQueHayaUsuarioLogueado = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        let user = await axios.get(
          `http://localhost:3001/user/${currentUser.email}`
        );
        if(user.data.banned){

          history.push("/banned")

        }
        setUser(user.data);
        emailUser = auth.currentUser.email;
      }
    });
  };

  // async function deleteFavourites(emailUser, id) {
  //   try {
  //     await axios.put(
  //       `http://localhost:3001/favourites/delete/${auth.currentUser.email}/${id}`
  //     );
  //     alert("favorito eliminado");
  //     window.location.reload();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // console.log(user?.favourites)

  return (
    <div>
      <UserNavBar />
      {user ? (
        <div>
          <h2 style={{textAlign: "center"}}>Mis favoritos</h2>
          <div style={{display: "inline-flex", justifyContent: "space-evenly"}}>
          {user?.favourites?.map((e) => {
            return (
              <div style={{display: "inline-flex", margin: 1 + "rem"}} key={e.id}>
                <Card
                  brand={e.brand}
                  model={e.model}
                  images={e.images}
                  price={e.price}
                  id={e.id}
                  stock={e.stock}
                />
              </div>
            );
          })}
          </div>
        </div>
      ) : (
        <h1>No tienes favoritos</h1>
      )}
    </div>
  );
}
