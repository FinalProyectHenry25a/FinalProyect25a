import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/Searchbar";
import { useDispatch, useSelector } from "react-redux";
import { BsFillCartFill } from "react-icons/bs";
import { getLocalCart } from "../../Actions";

//import style from "./../NavBar/NavBar.module.css";

const NavBar = ({ setCurrentPage }) => {
  const [cartCount, setCartCount] = useState(0);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.qty;
    });

    setCartCount(count);
  }, [cart, cartCount]);

  useEffect(() => {
    dispatch(getLocalCart());
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{background: "#028090"}} >
      <div className="container-fluid justify-content-between">
        {/* Left elements */}
        <div className="d-flex">
          {/* Brand */}
          <a className="navbar-brand" href="/home">
            Henry Store
          </a>
        </div>
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
        {/* Left elements */}

        {/* Center elements */}
        <div className="navbar-collapse collapse show" style={{justifyContent: "space-between" }} id="navbarSupportedContent">
          <br/>
          {/* Center elements */}

          {/* Right elements */}
          <ul className="navbar-nav flex-row">
            <li className="nav-item me-3 me-lg-1">
              <Link
                className="nav-link d-sm-flex active align-items-sm-center"
                to="/login"
              >
                Login
              </Link>
            </li>
            <li className="nav-item me-3 me-lg-2">
              <Link
                className="nav-link d-sm-flex active align-items-sm-center"
                to="/cart"
              >
                <BsFillCartFill /> {cartCount}
              </Link>
            </li>
          </ul>
        </div>
        {/* Right elements */}
      </div>
    </nav>
  );
};
{
  /*<nav className="navbar navbar-expand-lg bg-light">
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
        <SearchBar className="form-control form-control-lg rounde bg-transparent" setCurrentPage={setCurrentPage}/>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/login">
                Login
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/contacto">
                Contacto
              </Link>
            </li>
          </ul>

          <Link className="nav-link active m-4" to="/cart">
           <BsFillCartFill/> {cartCount}
          </Link>
          
        </div>
      </div>
</nav> */
}

export default NavBar;
