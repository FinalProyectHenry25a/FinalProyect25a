/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/Searchbar";
import { useSelector, useDispatch } from "react-redux";
import { BsFillCartFill } from "react-icons/bs";
import { getLocalCart, modoOscuro, lenguaje } from "../../Actions/index";
import styles from "./../NavBar/NavBar.module.css";
import logo from "../../images/smartworld.jpg";
import { navBarLang } from "./navBarLang";

const NavBar = ({ setCurrentPage }) => {
  
  const [cartCount, setCartCount] = useState(0);
  const cart = useSelector((state) => state.cart);
  const lan = useSelector((state) => state.language);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.qty;
    });

    setCartCount(count);
  }, [cart, cartCount, setCartCount]);
  useEffect(() => {
    dispatch(getLocalCart());
  }, []);

  useEffect(() => {
    dispatch(getLocalCart());
  }, []);

  const change = () => {
    setOpen(!open);
  };
  

  return (
    <nav className={styles.navContainer}>
      

      <div className={styles.container}>

        <a className={styles.ancor} href="/home">
          <img src={logo} alt="logo" className={styles.logo} />
        </a>
      </div>
      
      <select onChange={(e) =>dispatch(modoOscuro(e.target.value))} id='modoOscuro'  >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <div>
        <SearchBar setCurrentPage={setCurrentPage} className={styles.search}/>
        </div>
            
      <a href="#" className={styles.toggleButton} onClick={change}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </a> 
      <div
        className={`${open ? styles.navbarLinksActive : styles.navbarLinks}`}
      >
        <ul>
        <li>
             <Link className={styles.cart} to="/cart">
              <BsFillCartFill /> {cartCount}
            </Link> 
            </li>
          <li>
            <Link to="/login" className={styles.links}>
            {navBarLang[lan].ingresa}
            </Link>
          </li>
          <li>
            <Link to="/register" className={styles.links}>
            {navBarLang[lan].creaTuCuenta}
            </Link>
          </li>
          <li>
            <Link to="/contacto" className={styles.links}>
            {navBarLang[lan].contacto}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
