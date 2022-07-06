import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhones, getQuestions } from "../../Actions";


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
        console.log(questionID)
        if(input){
    
        await axios.put(`http://localhost:3001/pregunta/${questionID}`, {

          answer: input
        });
        alert("respuesta enviada")
        window.location.reload()
      }else alert("haga una pregunta antes de publicar")
    
    };

return(
    <div>
            <h1>Preguntas</h1>
         { allQuestions? allQuestions.map(e=>{      
             
            return(
                <div  id={e.id}>
                    <p>{e.question}</p>
                    <p>{e.user_email}</p>
                   
                    <input onChange={(e) => handlerChange(e)} type="text" placeholder="responder..." />
                    <button  onClick={(e) => responder(e)}>responder</button>
                    
                    
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