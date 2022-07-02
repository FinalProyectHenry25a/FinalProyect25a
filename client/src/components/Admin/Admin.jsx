import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getUser } from "../../Actions";
import { auth } from "../../firebase/firebase-config";

export default function Admin() {

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    userVerificate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userVerificate = async () => {
    await onAuthStateChanged(auth, async (currentUser) => {
      try {
        
        let info = await dispatch(getUser(currentUser.email))

        if(!info.payload.isAdmin){

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
<<<<<<< HEAD
      <Link to="/home">
        <button>Home</button>
=======
      <Link to={`/admin/posts`}>
        <button>Productos</button>
>>>>>>> 6da1dc6ae36cefdb33c58fad9df35185b850928d
      </Link>

      <h3>Ventas realizadas:</h3>
    </div>
  );
}
