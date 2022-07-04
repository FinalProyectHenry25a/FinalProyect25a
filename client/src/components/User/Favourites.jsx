import React from "react";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import axios from "axios";
import Card from "../card/Card";
import UserNavBar from "../UserNavBar/UserNavBar";
import { Link, useParams } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";

export default function Favourites(props) {
  const [user, setUser] = useState();

  const {email} = useParams();

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
     
      }
    });
  };

  async function deleteFavourites(email, id) {
    try {
      await axios.put(`http://localhost:3001/favourites/delete/${email}/${id}`);
      
      window.location.reload();
      alert("favorito eliminado");
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div>
      <UserNavBar />
      {user ? (
        <div>
          <h2>mis favoritos</h2>
          {user.favourites?.map((e) => {
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
                  <button onClick={() => deleteFavourites(auth.currentUser.email, e.id)}>Eliminar</button> 
              </div>
            );
          }
          )}

        </div>
      ) : (
        <h1>no tienes favoritos</h1>
      )}
    </div>
  );
}
