import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase-config";
import NavBar from "../NavBar/NavBar";
import { BsFillCartFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import axios from "axios";
import "./UserNavBar.css";
import SearchBar from "../SearchBar/Searchbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UserNavBar({setCurrentPage}) {
  const [cartCount, setCartCount] = useState(0);
  const cart = useSelector((state) => state.cart);
  const [user, setUser] = useState();

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
            {user.isAdmin ? <Link className="nav-link active m-3" to="admin">
              <button>Admin Menu</button>
            </Link> : null}
            <Link className="nav-link active m-3" to="cart">
              <BsFillCartFill /> {cartCount}
            </Link>
            <SearchBar setCurrentPage={setCurrentPage} />
          </div>
        </div>
      ) : (
        <NavBar />
      )}
    </nav>
  );
}
