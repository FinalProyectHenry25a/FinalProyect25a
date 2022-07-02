import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";
import { postAdmin } from "../../Actions";
import axios from "axios";

export default function Posts(props) {
  const [user, setUser] = useState(auth.currentUser);
  const [postsState, setPostsState] = useState([]);
  const [change, setChange] = useState({ do: "add", amount: 0 });

  const history = useHistory();
  const dispatch = useDispatch();

  const phonesAdmin = useSelector((state) => state.phones);

  useEffect(async () => {
    userVerificate();
    dispatch(postAdmin());
  }, [user, change]);

  const userVerificate = async () => {
    await onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser || currentUser.email !== props.userRole) {
      }
    });
  };

  return (
    <div>
      <Link to="/admin">
        <button>◀ Back</button>
      </Link>

      <br />
      <br />

      {phonesAdmin?.map((el) => (
        <div key={el.id}>
            <img src={el.images} alt=""/>
          <h6>
            {el.brand} - {el.model} - {el.releaseDate} - {el.price} - {el.rating} - {el.color} - {el.processor} - {el.ram} - {el.rom} - {el.network} - {el.batery} - {el.frontal_cam} - {el.main_cam} - {el.inches} - {el.screen} - {el.resolution}
          </h6>
          <Link to={`/admin/ProductToEdit/${el.id}`}><button>editar</button></Link>    
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}
