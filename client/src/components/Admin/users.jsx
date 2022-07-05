import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersAdmin } from "../../Actions";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";

export default function Users() {

    const dispatch = useDispatch();
    const history = useHistory()

    const { email } = useParams();

    const users = useSelector((state) => state.users)

    useEffect(() => {
        dispatch(usersAdmin());
    }, [dispatch]);

    async function deleteUsers(email) {
        try {
          await axios.delete(`http://localhost:8080/admin/users/${email}`);
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
              <button onClick={() => deleteUsers(el.email)}>eliminar</button>
            </div>
            )
            })}
            
        </div>
      );
    
}
