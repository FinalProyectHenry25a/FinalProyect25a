import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAllUsers, getUser } from "../../Actions";
import { auth } from "../../firebase/firebase-config";

export default function Admin() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users)
  const history = useHistory();

  useEffect(() => {
    userVerificate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userVerificate = async () => {
    await onAuthStateChanged(auth, async (currentUser) => {
      try {
        let info = await dispatch(getUser(currentUser.email));

        if (!info.payload.isAdmin || info.payload.banned) {
          history.push("/home");
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    userVerificate();
    dispatch(getAllUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div>
      <h1>Administración de la página</h1>
      <Link to="/admin/agregar-publicacion">
        <button>Publicar nuevo artículo</button>
      </Link>
      <br />
      <Link to="/admin/publicaciones">
        <button>Publicaciones</button>
      </Link>
      <br />
      <Link to="/admin/editar-stock">
        <button>Modificar stock de productos</button>
      </Link>
      <br />
      <Link to="/admin/control-de-usuarios">
        <button>Administrar usuarios</button>
      </Link>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <Link to={`/admin/users`}>
        <button>Usuarios</button>
      </Link>
      <Link to={`/admin/preguntas`}>
        <button>Preguntas</button>
      </Link>
      <h3>Ventas realizadas:</h3>
        {<div>
          {allUsers ? allUsers.map((el) => {
            return (
              <div key={el.email}>
              <h6>
                 {el.shopping.map(el => {
                  return (
                    <div>
                    <h6>
                    {el.brand} - {el.model} - {el.releaseDate} - {el.price} - {el.rating} - {el.color} - {el.processor} - {el.ram} - {el.rom} - {el.network} - {el.batery} - {el.frontal_cam} - {el.main_cam} - {el.inches} - {el.screen} - {el.resolution}
                    </h6>
                    <img src={el.images} alt=""/>
                    </div>
                  )
                })}
              </h6>
            </div>
            )
            }): <span>Sin Ventas</span>}
            
        </div> }
      
    </div>
  );
}
