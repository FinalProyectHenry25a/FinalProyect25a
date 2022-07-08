import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getQuestions } from "../../Actions";


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
    
        await axios.put(`https://back25ademo.herokuapp.com/pregunta/${questionID}`, {

          answer: input
        });
        alert("respuesta enviada")
        window.location.reload()
      }else alert("haga una pregunta antes de publicar")
    
    };

const editar = async (e)=>{
    let questionID = e.nativeEvent.path[1].id;
    
    await axios.put(`https://back25ademo.herokuapp.com/pregunta/${questionID}`, {

        answer: null
      });
      window.location.reload()
}

const eliminar = async (e)=>{
    let questionID = e.nativeEvent.path[1].id;
   
    await axios.delete(`https://back25ademo.herokuapp.com/pregunta/${questionID}`);
      window.location.reload()
}

return(
    <div>
            <h1>Preguntas</h1>
         { allQuestions? allQuestions.map(e=>{      
             
            return(
                
                <div id={e.id} className="border rounded align-items-center justify-content-center w-50">
                    <p>{e.question}</p>
                    <p>{e.user_email}</p>
                   
                   {!e.answer?
                   <div id={e.id} className="w-100 row">
                   <input className="form-control w-50 me-3" onChange={(e) => handlerChange(e)} type="text" placeholder="responder..." />
                    <button className="btn btn-secondary w-25" onClick={(e) => responder(e)}>responder</button>
                    </div>
                    :
                    (
                        <div id={e.id}>
                    <p>{e.answer}</p>
                    <button className="btn btn-secondary" onClick={(e) => editar(e)}>borrar respuesta</button>
                    </div>
                   )}
                   <br />
                   <button className="btn btn-danger" onClick={(e) => eliminar(e)}>Eliminar pregunta</button>

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