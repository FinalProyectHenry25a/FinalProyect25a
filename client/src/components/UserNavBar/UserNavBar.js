import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase-config";
import NavBar from "../NavBar/NavBar";
import { BsFillCartFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import axios from "axios";
import SearchBar from "../SearchBar/Searchbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLocalCart } from "../../Actions";
import logo from "../../images/smartworld.jpg";

import styles from '../UserNavBar/usernavbar.module.css'
import { userNavBarLang } from "./userNavBarLang";

export default function UserNavBar({setCurrentPage}) {
  const [cartCount, setCartCount] = useState(0);
  const cart = useSelector((state) => state.cart);
  const lan = useSelector((state) => state.language);
  const [user, setUser] = useState();
  const [open, setOpen] = useState(false);

  

  const dispatch = useDispatch();

  useEffect(() => {
    verificarQueHayaUsuarioLogueado();
  }, []);

  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.qty;
    });

    setCartCount(count);
  }, [cart, cartCount]);

  useEffect(() => {

    dispatch(getLocalCart())

  }, [])
  const change = () => {
    setOpen(!open);
  };


  const verificarQueHayaUsuarioLogueado = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        let user = await axios.get(
          `http://localhost:3001/user/${currentUser.email}`
        );
        setUser(user.data);
      }
    });
  };

  const logout = async () => {
    await signOut(auth);
    setUser(false);
  };

  return (
    // <nav className="navbar navbar-expand-lg bg-light">
    //   {user ? (
    //     <div className="container-fluid">
    //       <Link className="navbar-brand" to="/home">
    //         Henry Store
    //       </Link>
    //       <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //         <span className="navbar-toggler-icon"></span>
    //       </button>
    //       <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //         <li className="nav-item dropdown">
    //       <Link className="nav-link dropdown-toggle active m-3" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    //               <BsPersonCircle /> {user.username}
    //             </Link>
    //       <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
    //         <li><Link className="dropdown-item" to="/mi-perfil/">Mi perfil</Link></li>
    //         <li><Link className="dropdown-item" to="/mis-compras">Mis compras</Link></li>
    //         <li><Link className="dropdown-item" to="/favoritos">Favoritos</Link></li>
    //         <li><hr className="dropdown-divider"/></li>
    //         <li><Link className="dropdown-item" to="/home" onClick={logout}>Cerrar Sesion</Link></li>
    //       </ul>
    //     </li>
    //         </ul>
    //         {user.isAdmin ? <Link className="nav-link active m-3" to="admin">
    //           <button>Admin Menu</button>
    //         </Link> : null}
    //         <Link className="nav-link active m-3" to="cart">
    //           <BsFillCartFill /> {cartCount}
    //         </Link>
    //       </div>
    //     </div>
    //   ) : (
    //     <NavBar />
    //   )}
    // </nav>
    
    <nav className={styles.navbar}>
    {user ? (
      <><div className={styles.brandLogo}>
          <a href="/home">
            <img src={logo} alt="logo" className={styles.logo} />
          </a>
        </div><div className={styles.search}>
            <SearchBar setCurrentPage={setCurrentPage} className={styles.search} />
            <p className={styles.prf2}>Hola {user.username}!</p>
          </div><a href="#" className={styles.toggleButton} onClick={change}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </a><div
            className={`${open ? styles.navbarLinksActive : styles.navbarLinks}`}
            >
          
             
            <ul>
              <li>
             <Link className={styles.cart} to="/cart">
              <BsFillCartFill /> {cartCount}
            </Link> 
            </li>
              <li>
                <Link to="/mi-perfil/" className={styles.links}>
                {userNavBarLang[lan].Miperfil}
                </Link>
              </li>
              <li>
                <Link to="/mis-compras" className={styles.links}>
                {userNavBarLang[lan].MisCompras}
                </Link>
              </li>
              <li>
                <Link to="/favoritos" className={styles.links}>
                {userNavBarLang[lan].Favoritos}
                </Link>
              </li> 
              <li> 
            {user?.isAdmin ? <Link className="nav-link active m-3" to="admin">
              Menu de administración
            </Link> : null}
            </li>
              <li>
                <Link to="/home" className={styles.links} onClick={logout}>
                {userNavBarLang[lan].CerrarSesion}
                </Link>
              </li>
           
            </ul>
          </div>
          </>
    ) : (
         <NavBar />
       )}
    </nav>
  );
}
