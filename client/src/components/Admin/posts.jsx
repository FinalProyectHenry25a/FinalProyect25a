import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth } from "../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { getUser } from "../../Actions";
import { useDispatch } from "react-redux";

export default function Posts(props) {

  const dispatch = useDispatch();
  const [postsState, setPostsState] = useState([]);
  const history = useHistory();

  useEffect( () => {

    userVerificate();
    loadPosts();
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  
  async function loadPosts() {
    try {
      const post = (await axios("http://localhost:8080/admin/posts")).data;
      setPostsState(post);
    } catch (error) {
      console.log(error);
    }
  }

  async function deletePost(id) {
    try {
      await axios.delete(`http://localhost:8080/admin/post/${id}`);
      await loadPosts();
      alert("Publicación borrada");
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

      {postsState?.map((el) => (
        <div key={el.id}>
          <img src={el.images} alt=""/>
          <h6>
          {el.brand} - {el.model} - {el.releaseDate} - {el.price} - {el.rating} - {el.color} - {el.processor} - {el.ram} - {el.rom} - {el.network} - {el.batery} - {el.frontal_cam} - {el.main_cam} - {el.inches} - {el.screen} - {el.resolution}
          </h6>
          <Link to={`/admin/ProductToEdit/${el.id}`}><button>editar</button></Link>
          <button onClick={() => deletePost(el.id)}> Borrar </button>
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}
