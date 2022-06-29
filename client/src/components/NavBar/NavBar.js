import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import SearchBar from "../SearchBar/Searchbar";
import { useDispatch, useSelector } from "react-redux";

//import style from "./../NavBar/NavBar.module.css";

const NavBar = () => {
  const [cartCount, setCartCount] = useState(0);
  const cart = useSelector(state => state.cart)

   useEffect(() => {
     let count = 0;
    cart.forEach((item) => {
     count += item.qty;
    });

    setCartCount(count);
   }, [cart, cartCount]);

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Henry Store
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/login">
                Login
              </Link>
              <Link className="nav-link active" to="/cart">
                cart {cartCount}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/agregado">
                Agregar Celular
              </Link>
            </li>
          </ul>
          {/* <SearchBar /> */}
        </div>
      </div>
    </nav>
  );
};
{
  /* <div className={style.flex}>

      <div>

        <h1>Logo</h1>

      </div><div className={style.carrito}>

          <Link to="/login">

            <button className={style.btn}>Login</button>

          </Link>

          <h2>CARRITO</h2>

        </div>

    </div> */
}

export default NavBar;
