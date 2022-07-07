/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/Searchbar";
import { useSelector, useDispatch } from "react-redux";
import { BsFillCartFill } from "react-icons/bs";
import { getLocalCart } from "../../Actions/index";
import styles from "./../NavBar/NavBar.module.css";
import logo from "../../images/smartworld.jpg";

//import style from "./../NavBar/NavBar.module.css";

const NavBar = ({ setCurrentPage }) => {
  const [cartCount, setCartCount] = useState(0);
  const cart = useSelector((state) => state.cart);
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
    // <nav className={style.navContainer}>

    //   <div className={style.container}>

    //     <a className={style.ancor} href="/home">
    //       <img src={logo} alt="logo" className={style.logo} />
    //     </a>

    //   </div>
    //   <div>
    //     <SearchBar setCurrentPage={setCurrentPage} className={style.search}/>
    //         <a href="#" className={style.toggleButton} onClick={change}>
    //           <span className={style.bar}></span>
    //           <span className={style.bar}></span>
    //           <span className={style.bar}></span>
    //         </a>
    //         </div>
    //   <div className={style.container2}>
    //     <Link className={style.links} to="/cart">
    //       <BsFillCartFill className={style.cart} /> {cartCount}
    //     </Link>
    //   </div>
    //   <div
    //     className={`${open ? style.navbarLinksActive : style.containerCuentas}`}
    //   >
        
    //     <div>
    //       <p className={style.prf}>Envíos gratis a partir de $70000.</p>
    //     </div>
    //     <div className={style.containerCuentas2}>
    //       <div>

    //         <Link className={style.links} to="/login">
    //           Ingresá
    //         </Link>
    //       </div>

    //       <div>
    //         <Link className={style.links} to="/register">
    //           Creá tu cuenta
    //         </Link>
    //       </div>
    //       <div>
    //         <Link className={style.links} to="/contacto">
    //           Contacto
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </nav>
    <nav className={styles.navbar}>
        <div className={styles.brandLogo}> <img src={logo} alt="logo" className={styles.logo}/></div>
        <div className={styles.search}><SearchBar setCurrentPage={setCurrentPage} className={styles.search}/></div>
        
        <a href="#" className={styles.toggleButton} onClick={change}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </a>
        <div className={`${open ? styles.navbarLinksActive : styles.navbarLinks}`}>
          <ul>
            
            <li><Link to="/login" className={styles.links}>
    Ingresá
           </Link></li>
            <li><Link  to="/register" className={styles.links}>
               Creá tu cuenta
             </Link></li>
            <li><Link to="/contacto" className={styles.links}>
               Contacto
             </Link></li>
          </ul>
        </div>
      </nav>
  );
};

export default NavBar;
