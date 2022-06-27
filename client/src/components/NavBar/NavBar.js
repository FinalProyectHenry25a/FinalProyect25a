import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/Searchbar";
import style from './../NavBar/NavBar.module.css'



const NavBar = () => {



    return(
        <div className={style.flex}>
            <div>
             <h1>Logo</h1>
            </div>
            <SearchBar/>
            <div className={style.carrito}>
                <Link to="/login">
                <button className={style.btn}>Login</button>
                </Link>
                <Link to="/miCarrito">
                <button>CARRITO</button>
                </Link>
            </div>
        </div>
    )
}
export default NavBar