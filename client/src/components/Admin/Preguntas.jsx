import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getQuestions } from "../../Actions";

import style from "./../Admin/Admin.module.css"

export default function Preguntas(){
const allQuestions = useSelector((state) => state.questions)


const dispatch = useDispatch()
const [input, setInput] = useState("");

useEffect(()=>{
    dispatch(getQuestions())
},[dispatch])


 

    const handlerChange = (e) => {
        
        setInput(e.target.value);
    };
    const responder = async (e) => {
        let questionID = e.nativeEvent.path[1].id;
        
        if(input){
    
        await axios.put(`http://localhost:3001/pregunta/${questionID}`, {

          answer: input
        });
        alert("respuesta enviada")
        window.location.reload()
      }else alert("haga una pregunta antes de publicar")
    
    };

const editar = async (e)=>{
    let questionID = e.nativeEvent.path[1].id;
    
    await axios.put(`http://localhost:3001/pregunta/${questionID}`, {

        answer: null
      });
      window.location.reload()
}

const eliminar = async (e)=>{
    let questionID = e.nativeEvent.path[1].id;
   
    await axios.delete(`http://localhost:3001/pregunta/${questionID}`);
      window.location.reload()
}

return(
    <div>
          <Link to="/admin">
        <button className={style.btn}>Volver</button>
      </Link>
            <h1 className="d-flex justify-content-center">Preguntas</h1>
         { allQuestions? allQuestions.map(e=>{      
             
            return(
                <div className="row justify-content-center mt-4">
                <div id={e.id} className="border rounded align-items-center justify-content-center w-75">
                    <p>Usuario: {e.user_email}</p>
                    <p>-{e.question}</p>
                   
                   {!e.answer?
                   <div id={e.id} className="w-100 row">
                   <input className="form-control w-50 me-3" onChange={(e) => handlerChange(e)} type="text" placeholder="responder..." />
                    <button className="btn btn-secondary w-25" onClick={(e) => responder(e)}>responder</button>
                    </div>
                    :
                    (
                        <div id={e.id}>
                    <p>-{e.answer}</p>
                    <div className="d-flex justify-content-center">
                    <button className="btn btn-secondary d-flex justify-content-center align-items-center" onClick={(e) => editar(e)}>borrar respuesta</button>
                    </div>
                    </div>
                   )}
                   <br />
                   <div></div>
                   <button className="d-flex justify-content-center btn btn-danger" onClick={(e) => eliminar(e)}>Eliminar pregunta</button>
                   </div>
                </div>
            )
        // quiero retornar TODAS las preguntas de TODOS los celulars

        //   e.map(el=>{
        
        //          return(
        //              <div>
        //                 <p>lsa preguntas son: </p>
                                                
        //                 {/* <p>{el.pregunta}</p> */}
                                             
        //              </div>
        //          )

        //      })
         
            }):(
            <p>no hay preguntas</p>
          )
}
      
        </div>
    )
}