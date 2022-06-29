import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";

export default function UsersControl(props) {

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
      <Link to="/admin">
        <button>◀ Back</button>
      </Link>
      <h1>edito usuarios</h1>
    </div>
  );
}
