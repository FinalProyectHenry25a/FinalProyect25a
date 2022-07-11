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
import { useHistory } from "react-router-dom";
import styles from './styles/MisCompras.module.css'
import BtnBack from '../back/BtnBack'

export default function MisCompras() {
  const [user, setUser] = useState();
  const [compras, setCompras] = useState();
  const [input, setInput] = useState("");
  const [puntaje, setPuntaje]=useState(null)
  const allPhones = useSelector((state) => state.phones);
  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    verificarQueHayaUsuarioLogueado();
    
  }, []);

  const verificarQueHayaUsuarioLogueado = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        let user = await axios.get(
          `http://localhost:3001/user/${currentUser.email}`
        );
        if(user.data.banned){

          history.push("/banned")

        }
        setUser(user.data);

        let array = user.data.shopping;

        let arrSinRep = [];

        for (let i = 0; i < array.length; i++) {
          let flag = false;
          for (let j = 0; j < arrSinRep.length; j++) {
            if (array[i].id === arrSinRep[j].id) flag = true;
          }
          if (flag === false) arrSinRep.push(array[i]);
        }

        for (let i = 0; i < arrSinRep.length; i++) {
          arrSinRep[i].cant = 0;
          for (let j = 0; j < array.length; j++) {
            if (arrSinRep[i].id === array[j].id)
              arrSinRep[i].cant = arrSinRep[i].cant + 1;
          }
        }
        setCompras(arrSinRep);
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

    await axios.put(`http://localhost:3001/home/${user.email}/${productID}`, {
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
    <>
      <UserNavBar />
      <BtnBack/>
      {user ? (
        <div className={styles.container}>
          {user.shopping ? (
            <div className={styles.containerCard}>
              {" "}
              <h2>Mis Compras</h2>

              {compras?.map((e) => {

                return (
                  <div key={e.id}>

                    <br/>
                    <h3>Unidades: {e.cant}</h3>
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
                          className={styles.input}
                          onChange={(e) => handlerChange(e)}
                          type="text"
                          placeholder="Dejanos tu opinion..."
                          value={input.id}
                        ></input>
                        <div>
                        <p className={styles.prf}>Selecciona para puntuar el producto adquirido</p>
                             <button onClick={()=>rate(1,e.id)}>⭐</button>
                             <button onClick={()=>rate(2,e.id)}>⭐</button>
                             <button onClick={()=>rate(3,e.id)}>⭐</button>
                             <button onClick={()=>rate(4,e.id)}>⭐</button>
                             <button onClick={()=>rate(5,e.id)}>⭐</button>
                        </div>
                        <button onClick={(e) => publicar(e)} className={styles.btn}>compartir</button>
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
    </>
  );
}
