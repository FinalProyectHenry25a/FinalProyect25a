import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase/firebase-config';
import { useHistory } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

const UserNavBar = () => {

    const [ user, setUser ] = useState(true);

    onAuthStateChanged(auth, (currentUser) => {

        setUser(currentUser)

    })

    const history = useHistory();

    const logout = async () => {

        await signOut(auth);
        history.push('/home');
        setUser(false);

    }

  return (

    <div>

        {user ? <><h1>Estoy logueado wey</h1><button onClick={logout}>Cerrar sesion</button></> : <NavBar />}

    </div>

  )

};

export default UserNavBar;