import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";
import { getAllUsers, becomeAdmin, getUser } from "../../Actions/index";

export default function UsersControl() {

  const dispatch = useDispatch();

  const allUsers = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    userVerificate();
    dispatch(getAllUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const userVerificate = async () => {

    await onAuthStateChanged(auth, async (currentUser) => {

      try {

        let info = await dispatch(getUser(currentUser.email))

        if(!info.payload.isAdmin){

          return <Redirect to="/home" />

        }
    
      } catch (error) {

        console.log(error);
        
      }

    });
  };

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
