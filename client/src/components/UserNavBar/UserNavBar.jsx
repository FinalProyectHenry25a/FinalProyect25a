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
import { useSelector } from 'react-redux';

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

        let user = await axios.get(`http://localhost:3001/user/${currentUser.email}`)
        setUser(user.data);

      }

    });

  }


  const logout = async () => {

    await signOut(auth);
    setUser(false)

  }

  return (


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
                </div>
                <Link to="/home">
                <button className="logout col-2 btn" onClick={logout}>Cerrar sesion</button>
                </Link>
              </ul>
            </div>
          </div>
        </nav> : <NavBar />}

    </nav>

  )

};

export default UserNavBar;