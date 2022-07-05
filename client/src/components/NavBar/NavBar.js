import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/Searchbar";
import { useSelector, useDispatch } from "react-redux";
import { BsFillCartFill } from "react-icons/bs";
import {getLocalCart} from '../../Actions/index'
import style from "./../NavBar/NavBar.module.css";
import logo from '../../images/smartworld.jpg'
const NavBar = ({setCurrentPage}) => {
  const [cartCount, setCartCount] = useState(0);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  console.log(cart)


  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.qty;
    });

    setCartCount(count);
  }, [cart, cartCount, setCartCount]);
  useEffect(() => {
    dispatch(getLocalCart())
  }, [])

  useEffect(() => {

    dispatch(getLocalCart())

  }, [])

  return (
    <nav className={style.navContainer}>

      <div className={style.container}>
        <a className={style.ancor} href="/home">
          <img src={logo} alt="logo" className={style.logo}/>
        </a> 
          </div>
          <div className={style.container}>

          <SearchBar setCurrentPage={setCurrentPage}/>
          <Link className={style.links} to="/cart">
           <BsFillCartFill  className={style.cart}/> {cartCount}
          </Link>
          </div>
        <div className={style.containerCuentas} >
              <div>
              <p className={style.prf}>
              Envíos gratis a partir de $2000.
              </p> 
              </div>
              <div className={style.containerCuentas2}>
              <div>

              <Link className={style.links} to="/login">
                Ingresá
              </Link>
              </div>

              <div>
              <Link className={style.links} to="/login">
                Creá tu cuenta
              </Link>
              </div>
              </div>
              
        </div>
    </nav>
  );
};
export default NavBar;
