import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase-config';
import NavBar from '../NavBar/NavBar';
import { BsFillCartFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import axios from 'axios';
import "./UserNavBar.css"
import SearchBar from '../SearchBar/Searchbar';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const UserNavBar = () => {


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


  
  useEffect(() => {

    verificarQueHayaUsuarioLogueado();

  }, [])

  const verificarQueHayaUsuarioLogueado = () => {

    onAuthStateChanged(auth, async (currentUser) => {

      if (currentUser) {

        let user = await axios.get(`http://localhost:3001/userCreator/${currentUser.email}`)
        setUser(user.data);

      }

    });

  }


  const logout = async () => {

    await signOut(auth);
    console.log("estoy saliendo");
    setUser(false)

  }

  return (


    <nav >
     
        {user ? <nav className='userNavBarContainer'>
        <div><SearchBar /></div>
          <div className='container'>
            <div className='listContainer'>
              <ul className="lista">
                <div className='avatar'>
                  <Link to="/mi-perfil/">
                  <BsPersonCircle />   {user.username}
                  </Link>
                </div>
                <div className='misCompras'>
                  <p>Mis Compras</p>
                </div>
                <div className='favoritos'>
                  <p>Favoritos</p>
                </div>
                
                <Link className="carrito" to="/cart">
                <BsFillCartFill />
                {cartCount}
              </Link>
                
                <button className="logout" href="home" onClick={logout}>Cerrar sesion</button>
              </ul>
            </div>
          </div>
        </nav> : <NavBar />}

    </nav>

  )

};

export default UserNavBar;