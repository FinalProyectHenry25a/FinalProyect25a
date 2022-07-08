import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";
import { getAllUsers, becomeAdmin, getUser, usersAdmin, removeAdmin } from "../../Actions/index";
import style from "./../Admin/Admin.module.css"

export default function UsersControl() {

  const dispatch = useDispatch();

  const history = useHistory();

  const users = useSelector((state) => state.users);

  const allUsers = users.filter((e) => e.email !== "finalproyect25a@gmail.com")

  useEffect(() => {
    
    dispatch(usersAdmin());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    userVerificate();
  }, []);

  const userVerificate = async () => {

    await onAuthStateChanged(auth, async (currentUser) => {

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
      <Link to="/admin">
        <button className={style.btn}>Volver</button>
      </Link>
      <h1 className="d-flex justify-content-center">Control de Usuarios</h1>
      <br/>
      <br/>
      {allUsers ? allUsers.map((user) => {
        return (
          <div className="row justify-content-center mt-4">
          <div className=" border rounder w-75 " key={user.username}>
            <h6 className="d-flex justify-content-center">
            {user.email} - {user.username} 
            </h6>
            <div className="d-flex justify-content-center mb-2">
          {!user.isAdmin ? <button key={user.firstname} value={user.email} className="justify-content-center  btn btn-secondary" onClick={() => dispatch(becomeAdmin(user.email))}>Convertir en Admin</button> : null}
          {user.isAdmin ? <button key={user.firstname} value={user.email} className="d-flex justify-content-center btn btn-danger" onClick={() => dispatch(removeAdmin(user.email))}>Quitar privilegio de Admin</button> : null}
          </div>
          </div>
    </div>

        )
      }) : <span>No hay usuarios registrados</span>}
    </div>
  );
}
