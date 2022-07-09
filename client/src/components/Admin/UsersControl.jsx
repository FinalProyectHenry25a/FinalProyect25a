import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";
import { getAllUsers, becomeAdmin, getUser, usersAdmin, removeAdmin } from "../../Actions/index";

export default function UsersControl() {

  const dispatch = useDispatch();

  const history = useHistory();

  const users = useSelector((state) => state.users);

  useEffect(() => {
    
    dispatch(getAllUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
 
    userVerificate();
  }, []);

  const userVerificate = async () => {

    await onAuthStateChanged(auth, async (currentUser) => {

      if(auth.currentUser === null || currentUser.email !== "finalproyect25a@gmail.com"){

        history.push("/home");
  
      }

      try {

        let info = await dispatch(getUser(currentUser.email))

        if(info.payload.banned) {

          history.push("/home");

        }

        if(info.payload.isAdmin){

          if(!info.payload.email === "finalproyect25a@gmail.com") {

            console.log(info.payload.email);

            history.push("/admin");

          }

        } else {

          history.push("/home");

        }
    
      } catch (error) {

        console.log(error);
        
      }

    });
  };

  return (
    <div>
      <h1>Control de Usuarios</h1>
      <Link to="/admin">
        <button>◀ Back</button>
      </Link>
      <br/>
      <br/>
      {users ? users.map((user) => {
        return (
          <div className="border rounder w-50" key={user.username}>
            <h6>
            {user.email} - {user.username} - {user.firstname} - {user.lastname}
            </h6>
          {!user.isAdmin ? <button key={user.firstname} value={user.email} className="btn btn-secondary" onClick={() => dispatch(becomeAdmin(user.email))}>Convertir en Admin</button> : null}
          {user.isAdmin ? <button key={user.firstname} value={user.email} className="btn btn-danger" onClick={() => dispatch(removeAdmin(user.email))}>Quitar privilegio de Admin</button> : null}
          </div>
        )
      }) : <span>No hay usuarios registrados</span>}
    </div>
  );
}
