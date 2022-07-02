import React from "react";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";

import axios from "axios";
import UserNavBar from "../UserNavBar/UserNavBar";
import Card from "../card/Card";

export default function MisCompras() {
  const [user, setUser] = useState();

  useEffect(() => {
    verificarQueHayaUsuarioLogueado();
    console.log(user)
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
  return (
    <div>
      <UserNavBar />
      {user ? (
        <div>
          {user.shopping ? (
            <div>
              <h1>Mis Compras:</h1>
              {user.shopping?.map((e) => {

                function rate (points, postId){
                  console.log(points, postId);

                /*   array de estos objetos:
                  {
                    us: email,
                    p: de 1 a5
                    id: del post
                  }
                */

                }

                return (

                  <div key={e.id}>
                    <h3>{e.brand} - {e.model}</h3>
                    <p>Selecciona para puntuar el producto adquirido</p>
                    <button onClick={()=>rate(1,e.id)}>⭐</button>
                    <button onClick={()=>rate(2,e.id)}>⭐</button>
                    <button onClick={()=>rate(3,e.id)}>⭐</button>
                    <button onClick={()=>rate(4,e.id)}>⭐</button>
                    <button onClick={()=>rate(5,e.id)}>⭐</button>
                  </div>

                );
              })}
            </div>
          ) : (
            <h2>no ha realizado compras aun</h2>
          )}
        </div>
      ) : (
        <h1>no estas logeado</h1>
      )}
    </div>
  );
}
