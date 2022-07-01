import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";
import { getAllUsers, becomeAdmin, getUser } from "../../Actions/index";

export default function UsersControl() {

  const history = useHistory();
  const dispatch = useDispatch();

  const allUsers = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    userVerificate();
    dispatch(getAllUsers());
  }, [dispatch]);

  const userVerificate = async () => {

    await onAuthStateChanged(auth, async (currentUser) => {

      try {

        dispatch(getUser(currentUser.email))

    
      } catch (error) {

        console.log(error);
        
      }

    });
  };

  if(!user.isAdmin) {

    history.push("/admin");

  }

  const clickAdmin = (e) => {

    dispatch(becomeAdmin(e.target.value));
    alert("Se convirtio en admin el weon")
    console.log(e.target.value);

  }

  return (
    <div>
      <Link to="/admin">
        <button>◀ Back</button>
      </Link>
      {allUsers ? allUsers.map((users) => {
        return (
          <div key={users.username}>
          <button key={users.lastname} value={users.email}>{users.email}</button>
          {user.email === "finalproyect25a@gmail.com" ? <button key={users.firstname} value={users.email} onClick={clickAdmin}>Convertir en Admin</button> : null}
          </div>
        )
      }) : <span>No hay usuarios registrados</span>}
    </div>
  );
}
