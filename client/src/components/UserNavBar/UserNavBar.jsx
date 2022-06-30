<<<<<<< HEAD
import { onAuthStateChanged, sendEmailVerification, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase-config';
import NavBar from '../NavBar/NavBar';
=======
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase-config";
import NavBar from "../NavBar/NavBar";
>>>>>>> f993135ca556afef8b07c0d3e1b8deb976faf902
import { BsFillCartFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import axios from "axios";
import "./UserNavBar.css";
import SearchBar from "../SearchBar/Searchbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

<<<<<<< HEAD

  const [user, setUser] = useState();
  const [cartCount, setCartCount] = useState(0);
  const cart = useSelector(state => state.cart)

  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.qty;
    });

    setCartCount(count);
  }, [cart, cartCount]);

=======
export default function UserNavBar({setCurrentPage}) {
  const [cartCount, setCartCount] = useState(0);
  const cart = useSelector((state) => state.cart);
  const [user, setUser] = useState();
>>>>>>> f993135ca556afef8b07c0d3e1b8deb976faf902

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

  const verificarQueHayaUsuarioLogueado = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
<<<<<<< HEAD
        console.log(currentUser.emailVerified);
        let user = await axios.get(`http://localhost:3001/user/${currentUser.email}`)
=======
        let user = await axios.get(
          `http://localhost:3001/user/${currentUser.email}`
        );
>>>>>>> f993135ca556afef8b07c0d3e1b8deb976faf902
        setUser(user.data);
      }
    });
  };

  const logout = async () => {
    await signOut(auth);
    setUser(false);
  };

  return (
<<<<<<< HEAD


    <nav >

      {user ? <nav className='userNavBarContainer'>
        {/* <div><SearchBar /></div> */}
        <div className='container'>
          <div className='listContainer'>
            <ul className="lista row">
              <div className='avatar col-3 justify-content-center align-items-center'>
                <Link to="/mi-perfil/">
                  <BsPersonCircle />   {user.username}
                </Link>
              </div>
              <div className='misCompras col-2 '>
                <Link to="/mis-compras">
                  <p>Mis Compras</p>
                </Link>
              </div>
              <div className='favoritos col-2'>
                <Link to="/favoritos">
                  <p>Favoritos</p>
                </Link>
              </div>
              <div className='carrito col-2'>
                <Link to="cart">
                  <BsFillCartFill /> {cartCount}
                </Link>
                <Link to="/home">
                  <button className="logout col-2 btn" onClick={logout}>Cerrar sesion</button>
                </Link>
              </div>

            </ul>
          </div>
        </div>
      </nav> : <NavBar />}

=======
    <nav className="navbar navbar-expand-lg bg-light">
      {user ? (
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            Henry Store
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle active m-3" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <BsPersonCircle /> {user.username}
                </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="/mi-perfil/">Mi perfil</a></li>
            <li><a className="dropdown-item" href="/mis-compras">Mis compras</a></li>
            <li><a className="dropdown-item" href="/favoritos">Favoritos</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="/home" onClick={logout}>Cerrar Sesion</a></li>
          </ul>
        </li>
            </ul>
            <Link className="nav-link active m-3" to="cart">
              <BsFillCartFill /> {cartCount}
            </Link>
            <SearchBar setCurrentPage={setCurrentPage} />
          </div>
        </div>
      ) : (
        <NavBar />
      )}
>>>>>>> f993135ca556afef8b07c0d3e1b8deb976faf902
    </nav>
  );
}
