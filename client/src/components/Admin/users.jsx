import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { banUser, getAllUsers, getUser, unbanUser, usersAdmin } from "../../Actions";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { auth } from "../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export default function Users() {

    const dispatch = useDispatch();
    const history = useHistory()

    const { email } = useParams();

    const users = useSelector((state) => state.users)

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

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

    async function deleteUsers(email) {
        try {
          await axios.delete(`http://localhost:3001/admin/users/${email}`);
          alert("usuario eliminado");
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      }

    return (
        <div>
          <Link to="/admin">
            <button>◀ Back</button>
          </Link>
    
          <br />
          <br />
    
          {users?.map((el) => {
            return (
            <div key={el.email}>
              <h6>
                {el.email} - {el.username} - {el.firstname} - {el.lastname}
              </h6>
              <button onClick={() => deleteUsers(el.email)}>Eliminar</button>
              {el.banned ? <button onClick={() => dispatch(unbanUser(el.email))}>Desbanear</button> : <button onClick={() => dispatch(banUser(el.email))}>Banear</button>}
            </div>
            )
            })}
            
        </div>
      );
    
}
