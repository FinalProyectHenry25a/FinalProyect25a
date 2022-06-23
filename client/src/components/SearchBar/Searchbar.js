import React, { useState } from "react";
import { getPhonesByModel } from "../../Actions";
import style from './../SearchBar/SearchBar.module.css'
import {useDispatch} from "react-redux"

const SearchBar = () => {
    const dispatch = useDispatch()
    const [model, setModel] = useState("");

    function handleSearch(e){ 
        setModel(e.target.value)
        
      } 

        function handleSubmit(e){
        e.preventDefault()
        dispatch(getPhonesByModel(model))
    }
    return(
        <div>
            <input className={style.Search} type="text" placeholder="Busca tu proximo celular" onChange={(e) => handleSearch(e)}></input>
            <button onClick={(e)=>handleSubmit(e)}>Buscar</button>
            
        </div>
    )
}
export default SearchBar