import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";

export default function Identify() {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const resetPassword = async (e) => {

        e.preventDefault();

        try {

            setError("");
            await sendPasswordResetEmail(auth, email);
            alert("Revisa tu correo electronico en el mail que proporcionaste");

        } catch (error) {

            console.log(error.message);
            alert("Fallo al recuperar tu contraseña, revise si introdujo bien su email")

        }

    }

    return (

        <div>

            <h2>Recupera tu Cuenta</h2>
            <br /><br />
            <h3>Ingresa tu correo electrónico para recuperar contraseña</h3>
            <br />
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico"></input>
            <br /><br />
            <Link to="/login"><button type="submit">Volver atras</button></Link>
            <button onClick={resetPassword} type="submit">Buscar</button>

        </div>

    )

}