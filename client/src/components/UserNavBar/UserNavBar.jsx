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

const UserNavBar = () => {


  const [user, setUser] = useState();

  useEffect(() => {

    verificarQueHayaUsuarioLogueado();

  }, [])


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
                <Link to="/mis-compras">
                  <p>Mis Compras</p>
                  </Link>
                </div>
                <div className='favoritos'>
                  <Link to="/favoritos">
                  <p>Favoritos</p>
                  </Link>
                </div>
                <div className='carrito'>
                  <Link to="cart">
                  <BsFillCartFill />
                  </Link>
                </div>
                <button className="logout" href="home" onClick={logout}>Cerrar sesion</button>
              </ul>
            </div>
          </div>
        </nav> : <NavBar />}

    </nav>

  )

};

export default UserNavBar;