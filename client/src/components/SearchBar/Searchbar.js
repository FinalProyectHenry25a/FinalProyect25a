import React from "react";
import style from './../SearchBar/SearchBar.module.css'

const SearchBar = () => {
    return(
        <div>
            <input className={style.Search} type="text" placeholder="Busca tu proximo celular"></input>
            
        </div>
    )
}
export default SearchBar