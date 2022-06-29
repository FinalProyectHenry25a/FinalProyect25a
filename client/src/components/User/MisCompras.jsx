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
        <UserNavBar/>
      {user ? (
        <div>
         
     
         {user.shopping?(
            <div>     <h2>mis favoritos</h2>
            {user.favourites?.map((e) => {
              return (
                <div key={e.id}>
                  <Card
                    brand={e.brand}
                    model={e.model}
                    images={e.images}
                    price={e.price}
                    id={e.id}
                    />
                    
                </div>
              );
            }
            )}

</div>
         ):(
            <h2>no ha realizado compras aun</h2>
         )}

        </div>
      ) : (
        <h1>no estas logeado</h1>
      )}
    </div>
  );
}
