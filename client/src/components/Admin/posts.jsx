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

      if(currentUser === null){

        history.push("/home");
  
      }

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
      <Link to="/home">
        <button>◀ Back</button>
      </Link>
      <br />
      <br />

      {postsState?.map((el) => (
        <div classNameName="border rounded p-3 m-2" key={el.id}>
          <Link to={`/admin/ProductToEdit/${el.id}`}>
            <button>editar</button>
          </Link>
          <button onClick={() => deletePost(el.id)}> Borrar </button>
          <h5>
            {el.brand} - {el.model}
          </h5>

          <div className="d-flex flex-row m-3" /* style={{ height: "40em" }} */>
            <ul className="list-group p-3 col-3">
              <li className="list-group-item">Lanzamiento: {el.releaseDate}</li>
              <li className="list-group-item">Precio: ${el.price}</li>
              <li className="list-group-item">Procesador: {el.processor}</li>
              <li className="list-group-item">Memoria RAM: {el.ram}</li>
              <li className="list-group-item">Memoria ROM: {el.rom}</li>
              <li className="list-group-item">Red: {el.network}</li>
              <li className="list-group-item">Batería: {el.batery}</li>
            </ul>

            <ul className="list-group p-3 col-3">
              <li className="list-group-item">
                Cámara frontal: {el.frontal_cam}
              </li>
              <li className="list-group-item">
                Camara principal: {el.main_cam}
              </li>
              <li className="list-group-item">Pantalla: {el.screen}</li>
              <li className="list-group-item">Pulgadas: {el.inches}</li>
              <li className="list-group-item">Resolución: {el.resolution}</li>
              <li className="list-group-item">Colores: {el.color}</li>
              <li className="list-group-item">Puntuación: {el.rating}</li>
            </ul>

            <div className="border rounded col-2 p-5">
              <img src={el.images} className="img-fluid" alt="" />
            </div>

            <div className="border rounded col-3 p-5 d-flex justify-content-between">
              {el.additionalphotos?.length >= 1
                ? el.additionalphotos.map((elem) => (
                    <img
                      className="img-fluid"
                      src={elem}
                      alt=""
                    />
                  ))
                : null}
            </div>
          </div>

          <div className="d-flex flex-row m-3 p-3"></div>

          <br />
          <br />
        </div>
      ))}
    </div>
  );
}
