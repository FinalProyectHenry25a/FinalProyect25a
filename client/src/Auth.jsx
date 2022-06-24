import React, { useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from './firebase/firebase-config';

const Auth = () => {

    const [ registerEmail, setRegisterEmail ] = useState("");
    const [ registerPassword, setRegisterPassword ] = useState("");
    const [ loginEmail, setLoginEmail ] = useState("");
    const [ loginPassword, setLoginPassword ] = useState("");

    const [ user, setUser ] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        console.log(user);
        setUser(currentUser)

    })

    const register = async () => {

        try {

            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            console.log(user);
            setRegisterEmail("");
            setRegisterPassword("");
            
        } catch (error) {
            
            console.log(error.message);

        } 

    }

    const login = async (e) => {

        try {

            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(user);
            setLoginEmail("");
            setLoginPassword("");
            
        } catch (error) {
            
            console.log(error.message);

        } 


    }

    const logout = async () => {

        await signOut(auth);

    }

  return (
    <div>
        <div>
            <div>
                <h3>Register User</h3>
                <input 
                value={registerEmail}
                name="registerEmail"
                placeholder='Email...' 
                type="email" 
                id="email" 
                onChange={ (e) => setRegisterEmail(e.target.value) } />

                <input 
                value={registerPassword}
                name="registerPassword"
                placeholder='Password...'
                type="password"  
                id='password' 
                onChange={ (e) => setRegisterPassword(e.target.value) }/>

                <button onClick={register}>Create User</button>

            </div>

            <div>

                <h3>Login</h3>

                <input 
                autoFocus
                value={loginEmail}
                name="loginEmail"
                placeholder='Email...' 
                type="email" 
                id="email" 
                onChange={ (e) => setLoginEmail(e.target.value) } />

                <input 
                value={loginPassword}
                name="loginPassword"
                placeholder='Password...'
                type="password"  
                id='password' 
                onChange={ (e) => setLoginPassword(e.target.value) }/>

                <button onClick={login}>Login</button>

            </div>

            <h4> User Logged In: </h4>
            {user?.email}

            <button onClick={logout}> Sign Out </button>

        </div>
    </div>
  )
}

export default Auth