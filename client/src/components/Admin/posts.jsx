import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";
import { getUser, postAdmin } from "../../Actions";

export default function Posts() {


  const history = useHistory();
  const dispatch = useDispatch();

  const phonesAdmin = useSelector((state) => state.phones);

  useEffect(() => {
    console.log("hola");
    userVerificate();
    dispatch(postAdmin());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const userVerificate = async () => {
    await onAuthStateChanged(auth, async (currentUser) => {
      try {
        
        let info = await dispatch(getUser(currentUser.email))

        if(!info.payload.isAdmin){

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
