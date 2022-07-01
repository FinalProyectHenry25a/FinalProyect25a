import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";

export default function Admin() {

  const [user, setUser] = useState(auth.currentUser);
  const history = useHistory();

  useEffect(() => {
    userVerificate();
  }, [user]);

  const userVerificate = async () => {
    await onAuthStateChanged(auth, async (currentUser) => {
      try {
        
        let info = await axios.get(`http://localhost:3001/user/${currentUser.email}`)

        if(!info.data.isAdmin){

          history.push("/home");

        }

      } catch (error) {

        console.log(error);
        
      }

    });
  };

  return (
    <div>
      <h1>Administración de la página</h1>
      <Link to="/admin/agregar-publicacion">
        <button>Publicar nuevo artículo</button>
      </Link>
      <br />
      <Link to="/admin/eliminar-publicacion">
        <button>Eliminar Publicación</button>
      </Link>
      <br />
      <Link to="/admin/editar-stock">
        <button>Modificar stock de productos</button>
      </Link>
      <br />
      <Link to="/admin/control-de-usuarios">
        <button>Administrar usuarios</button>
      </Link>

      <h3>Ventas realizadas:</h3>
    </div>
  );
}
