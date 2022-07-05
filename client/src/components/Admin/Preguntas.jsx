import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhones } from "../../Actions";


export default function Preguntas(){
const allPhones = useSelector((state) => state.phones)

const [preguntasYRespuestas, setPreguntasyRespuestas]= useState([])
const dispatch = useDispatch()
const [input, setInput] = useState("");

useEffect(()=>{
    dispatch(getPhones())
},[dispatch])


 

 async function buscoPreguntas() {
let arr=[]
    for(let i=0;i<allPhones.length;i++){
         allPhones[i].QyA!==null  ?
        arr.push(allPhones[i].QyA):
        (
            console.log("ee")
        )
    }
    setPreguntasyRespuestas(arr)
  
}
useEffect(()=>{
    buscoPreguntas()
    },[])

    const handlerChange = (e) => {
        setInput(e.target.value);
      };
      const responder = async (e) => {
        // let productID = e.nativeEvent.path[1].id;
        if(input){
    
        await axios.put(`http://localhost:3001/detalle/finalproyect25a@gmail.com/60d188bb-21fd-4519-97e4-029faa460e45`, {

          respuesta: input
        });
        alert("respuesta enviada")
        window.location.reload()
      }else alert("haga una pregunta antes de publicar")
    
    };

return(
    <div>
            <h1>Preguntas</h1>
         { preguntasYRespuestas.length>0? preguntasYRespuestas.map(e=>{      
            //me rotorna la pregunta, si solo tengo 1   
            return(
                <div>
                    <p>{e[0].pregunta}</p>
                    <p>{e[0].usuario}</p>
                    <div>
                    <input onChange={(e) => handlerChange(e)} type="text" placeholder="responder..." />
                    <button onClick={(e) => responder(e)}>responder</button>
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