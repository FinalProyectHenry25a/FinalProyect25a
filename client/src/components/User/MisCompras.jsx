import React from "react";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";

import axios from "axios";
import UserNavBar from "../UserNavBar/UserNavBar";
import Card from "../card/Card";
import { async } from "@firebase/util";
import { useDispatch, useSelector } from "react-redux";
import { getPhones } from "../../Actions";

export default function MisCompras() {
  const [user, setUser] = useState();
  const [input, setInput] = useState("");
  const [puntaje, setPuntaje]=useState(null)
  const allPhones = useSelector((state) => state.phones);
  const dispatch = useDispatch();

  useEffect(() => {
    verificarQueHayaUsuarioLogueado();
    
  }, []);

  const verificarQueHayaUsuarioLogueado = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        let user = await axios.get(
          `http://localhost:8080/user/${currentUser.email}`
        );
        setUser(user.data);
      }
    });
  };

  useEffect(() => {
    dispatch(getPhones());
  }, [dispatch]);

  const handlerChange = (e) => {
    setInput(e.target.value);
  };

  const publicar = async (e) => {
    let productID = e.nativeEvent.path[1].id;
    if(input &&puntaje){

    await axios.put(`http://localhost:8080/home/${user.email}/${productID}`, {
      comentario: input, rating: puntaje
    });
    alert("review agregada")
    window.location.reload()
  }else alert("seleccione una estrella y deje su comentario")

};

  function rate (points, postId){
    
    setPuntaje(points)

  }



  return (
    <div>
      <UserNavBar />
      {user ? (
        <div>
          {user.shopping ? (
            <div>
              {" "}
              <h2>mis Compras</h2>
              {user.shopping?.map((e) => {
                return (
                  <div key={e.id}>
                    <Card
                      brand={e.brand}
                      model={e.model}
                      images={e.images}
                      price={e.price}
                      id={e.id}
                      stock={e.stock}
                    />

                    {allPhones.filter((el) => el.id === e.id)[0].review ===
                      null ||
                    !allPhones
                      .filter((el) => el.id === e.id)[0]
                      .review.find((elemento) =>
                        elemento.usuario.includes(user.username)
                      ) ? (
                      <div id={e.id}>
                        <input
                          name={e.id}
                          onChange={(e) => handlerChange(e)}
                          type="text"
                          placeholder="Dejanos tu opinion..."
                          value={input.id}
                        ></input>
                        <div>
                        <p>Selecciona para puntuar el producto adquirido</p>
                             <button onClick={()=>rate(1,e.id)}>⭐</button>
                             <button onClick={()=>rate(2,e.id)}>⭐</button>
                             <button onClick={()=>rate(3,e.id)}>⭐</button>
                             <button onClick={()=>rate(4,e.id)}>⭐</button>
                             <button onClick={()=>rate(5,e.id)}>⭐</button>
                        </div>
                        <button onClick={(e) => publicar(e)}>compartir</button>
                      </div>
                    ) : (
                      <p></p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <h2>no ha realizado compras aun</h2>
          )}
        </div>
      ) : (
        <h1>no estas logeado</h1>
      )}
    </div>
  );
}
