import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/Searchbar";
import { useSelector } from "react-redux";
import { BsFillCartFill } from "react-icons/bs";

//import style from "./../NavBar/NavBar.module.css";

const NavBar = ({setCurrentPage}) => {
  const [cartCount, setCartCount] = useState(0);
  const cart = useSelector((state) => state.cart);

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
        <a className="navbar-brand" href="/home">
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
            </li>
          </ul>
          <Link className="nav-link active m-4" to="/cart">
           <BsFillCartFill/> {cartCount}
          </Link>
          <SearchBar setCurrentPage={setCurrentPage}/>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
