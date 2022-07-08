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
    if(auth.currentUser === null){

      history.push("/home");

    }

    userVerificate();
    loadPosts();
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 const userVerificate = async () => {

    await onAuthStateChanged(auth, async (currentUser) => {

      try {

        let info = await dispatch(getUser(currentUser.email))

        if(!info.payload.isAdmin || info.payload.banned){

          history.push("/home");

        }
    
      } catch (error) {

        console.log(error);
        
      }

    });
  };
  
  async function loadPosts() {
    try {
      const post = (await axios("http://localhost:3001/admin/posts")).data;
      setPostsState(post);
    } catch (error) {
      console.log(error);
    }
  }

  async function deletePost(id) {
    try {
      await axios.delete(`http://localhost:3001/admin/post/${id}`);
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

          <h5>{el.brand} - {el.model}</h5> 
          <p> {el.releaseDate} - {el.price} - {el.rating} - {el.color} - {el.processor} - {el.ram} - {el.rom} - {el.network} - {el.batery} - {el.frontal_cam} - {el.main_cam} - {el.inches} - {el.screen} - {el.resolution}</p>
          <p>Imagen principal:</p>
          <img src={el.images} width="50" height="60" alt=""/>
          <h6>

          <p>Imagenes secundarias: {el.additionalphotos?.length}</p>
          {el.additionalphotos?.length >= 1 ? el.additionalphotos.map( elem => <img src={elem} width="50" height="60" alt=""/>) : null}
            
          <br/>
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
