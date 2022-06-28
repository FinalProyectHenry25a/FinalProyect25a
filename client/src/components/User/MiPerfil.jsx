import React from "react";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";

import axios from "axios";

export default function MiPerfil() {
  const [user, setUser] = useState();

  useEffect(() => {
    verificarQueHayaUsuarioLogueado();
  }, []);

  const verificarQueHayaUsuarioLogueado = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        let user = await axios.get(
          `http://localhost:3001/userCreator/${currentUser.email}`
        );
        setUser(user.data);
        console.log(user);
      }
    });
  };
  return (
    <div>
      {user ? (
        <div>
          <h2>mis datos</h2>
          <div>
          <p>Usuario</p>
          <p>{user.username}</p>
          </div>
          <div>
          <p>E-mail</p>
          <p>{user.email}</p>
          </div>
          <div>
          <p>cambiar cotraseña</p>
          <button>Cambiar contraseña</button>
          </div>
          <div>
          <p>direccion</p>
          <p>{user.address}</p>
          <p>cambiar direccion de entrga</p>
          <input type="text" placeholder="nueva dirección" />
          <button>aceptar</button>
          </div>

          <h2>mis compras</h2>
         {user.shopping?(
            <div> 

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
