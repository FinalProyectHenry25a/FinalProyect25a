import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";

export default function Admin(props) {

  const [user, setUser] = useState(auth.currentUser);
  const history = useHistory();

  useEffect(() => {
    userVerificate();
  }, [user]);

  const userVerificate = async () => {
    await onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser || currentUser.email !== props.userRole) {
        history.push("/home");
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
      <Link to={`/admin/posts`}>
        <button>Productos</button>
      </Link>

      <h3>Ventas realizadas:</h3>
    </div>
  );
}
