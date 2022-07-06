import React from "react";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import axios from "axios";
import Card from "../card/Card";
import UserNavBar from "../UserNavBar/UserNavBar";
import { useDispatch } from "react-redux";
import { addToCartUser, addToCart } from "../../Actions";
import { useParams } from "react-router-dom";

export default function Favourites(props) {
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const { id } = useParams();

  let emailUser = "";
  useEffect(() => {
    verificarQueHayaUsuarioLogueado();
  }, []);

  const verificarQueHayaUsuarioLogueado = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        let user = await axios.get(
          `http://localhost:3001/user/${currentUser.email}`
        );
        setUser(user.data);
        emailUser = auth.currentUser.email;
      }
    });
  };

  async function deleteFavourites(emailUser, id) {
    try {
      await axios.put(
        `http://localhost:3001/favourites/delete/${auth.currentUser.email}/${id}`
      );
      alert("favorito eliminado");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <UserNavBar />
      {user ? (
        <div>
          <h2>Mis favoritos</h2>
          {user?.favourites.map((e) => {
            return (
              <div key={e.id}>
                <Card
                  brand={e.brand}
                  model={e.model}
                  images={e.images}
                  price={e.price}
                  id={e.id}
                  stock={e.stock}
                />
                <button
                  onClick={() => deleteFavourites(auth.currentUser.email, e.id)}
                >
                  Eliminar
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <h1>No tienes favoritos</h1>
      )}
    </div>
  );
}
