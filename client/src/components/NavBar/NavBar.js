import React from "react";
import SearchBar from "../SearchBar/Searchbar";
import style from './../NavBar/NavBar.module.css'

const NavBar = () => {
    return(
        <div className={style.flex}>
            <h1>Logo</h1>
            <SearchBar/>
            <button>Login</button>
        </div>
    )
}
export default NavBar