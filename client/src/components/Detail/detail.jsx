import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, addToCart, getUser, getQuestions, addToCartUser } from "../../Actions/index";
import { Link, useParams } from "react-router-dom";
import { onAuthStateChanged, reload, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import axios from "axios";
import styles from "./Detail.module.css";
import NavBar from "../NavBar/NavBar";

export default function Detail() {
  const [user, setUser] = useState(auth.currentUser);
  useEffect(() => {
    userVerificate();
  }, []);

  const userVerificate = async () => {
    await onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  };
  const dispatch = useDispatch();
  const { id } = useParams();
  const [review, setReview] = useState({
    comentario: ""
  })

  const [loggedUser, setLoggedUser] = useState();
  const [input, setInput] = useState("");


  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);
  
  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  // useEffect(() => {
  //   verificarQueHayaUsuarioLogueado();
  // }, []);

  // const verificarQueHayaUsuarioLogueado = () => {
  //   onAuthStateChanged(auth, async (currentUser) => {
  //     if (currentUser) {
  //       let user = await axios.get(
  //         `http://localhost:3001/user/${currentUser.email}`
  //       );
  //       if(user.data.banned){

  //         history.push("/banned")

  //       }
  //     }
  //   });
  // };

  const PID = useSelector((state) => state.phonesId);


  const allQuestions = useSelector((state)=>state.questions)


    function promedio(){
      if(PID.review)
      {   
        let arr=PID.review?.map(el=>el.rating)
       
        let suma = 0
        for(let i=0;i<arr.length;i++){
          suma=suma+arr[i]
        }
    
    return (suma/arr.length).toFixed(2)
  }else return "no fue ranqueado"
    }
  
    const verificarQueHayaUsuarioLogueado = () => {
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          let user = await axios.get(
            `http://localhost:3001/user/${currentUser.email}`
          );
          setUser(user.data);
        }
      });
    };

    
    useEffect(() => {

      verificarQueHayaUsuarioLogueado();
  
      
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlerChange = (e) => {
      setInput(e.target.value);
    };

    const publicar = async (e) => {
      // let productID = e.nativeEvent.path[1].id;
      if(input){
  
      await axios.post(`http://localhost:3001/pregunta`, {
        question: input,
        user_email: user.email,
        product_ID: PID.id,
      });
      alert("pregunta enviada")
      window.location.reload()
    }else alert("haga una pregunta antes de publicar")
  
  };


      
  return (
    <>
      <NavBar />
      <hr/>
      <div className={styles.divContainer}>

          <div className={styles.container1}>
          <img src={PID.images} alt="marcas" width={300} />
          </div>


          
<hr/>
        <div className={styles.container2}>
          <div>
          <h1>{PID.model}</h1>
          {PID.additionalphotos?.length >=1 ? PID.additionalphotos.map ( el => <img src={el} width="50" height="60" alt="No encontrada" />):null }
            <h3>${PID.price}</h3>
            <h3>Rating</h3>
            <div>
              <div>
                {promedio()}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  margin="4"
                  fill="currentColor"
                  className="bi bi-star-half"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                </svg>
              </div>

              <br />
            </div>

            <form>
              {PID.stock > 0 ? (
                <div>
                  {auth.currentUser ? (
                    <Link to="#">
                      <button
                        type="submit"
                        className={styles.btn}
                        onClick={(e) =>
                          dispatch(addToCartUser(user.email, PID.id))
                        }
                      >
                        Agregar al carrito User
                      </button>
                    </Link>
                  ) : (
                    <Link to="#">
                      <button
                        type="submit"
                        className={styles.btn}
                        onClick={(e) => dispatch(addToCart(PID.id))}
                      >
                        Agregar al carrito
                      </button>
                    </Link>
                  )}
                  <p>Disponibles: {PID.stock}</p>
                </div>
              ) : (
                <p>AGOTADO</p>
              )}
              {/* <button type="submit" className="btn btn-outline-dark"  onClick={e => dispatch(addToCart(PID.id))}>
              Agregar al Carrito
            </button> */}
            </form>
          </div>

          <div>
            <div>
              <h3>Especificaciones</h3>

              <div>
                <ul>
                  <li>
                    <span>{PID.ram}</span>
                  </li>

                  <li>
                    <span>{PID.rom}</span>
                  </li>

                  <li>
                    <span>Cuenta con un procesador {PID.processor}</span>
                  </li>

                  <li>
                    <span>Conectividad {PID.network}</span>
                  </li>
                  <li>
                    <span>Una bateria de {PID.batery} mAh</span>
                  </li>
                  <li>
                    <span>
                      Una camara frontal de {PID.frontal_cam}" y una principal
                      de {PID.main_cam}"
                    </span>
                  </li>
                  <li>
                    <span>
                      Cuenta con una pantalla {PID.screen} de {PID.inches}" y
                      una resolucion de {PID.resolution}"
                    </span>
                  </li>
                </ul>
              </div>
            </div>
             </div>
             <div>
            <hr></hr>
              <h3>Preguntas y Respuestas</h3>
              {user?
              (<div>
         
              <input onChange={(e) => handlerChange(e)} type="text" className={styles.input} placeholder="Escribinos tu pregunta" />
              <button onClick={(e) => publicar(e)} className={styles.btn2}>Preguntar</button>
              </div>
              ):(
                <p></p>
              )
            }
              {allQuestions? allQuestions.map((e) =>{
                console.log("id de producto",PID.id)
                console.log("id de producto de la question",e.product_ID)
                if(e.product_ID===PID.id){
                  return(
                    <>
                    <div className={styles.question}>
                      <p>Pregunta: {e.user_email}</p>
                      <p>- {e.question}</p>
                    </div>
                    <div className={styles.answer}>
                      <p>{e.answer}</p>
                    </div>
                  </>
                  )}}):(
                    console.log("id de producto",PID.id)
                  )

              }
             </div>

        </div>
      </div>
     
      <div className={styles.contact}>
        <h3>Comentarios</h3>
        {PID.review ? (
          PID.review.map((e) => {
            return (
              <div>
                <p>{e.usuario}</p>
                <p>{e.rating}</p>
                <p>{e.comentario}</p>
              </div>
            );
          })
        ) : (
          <p>este articulo no tiene comentarios</p>
        )}
      </div>
    </>
  );
}