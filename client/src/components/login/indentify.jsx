import React from "react";
import { Link } from "react-router-dom";

export default function Identify() {
    return(
        <div>
            <h2>Recupera tu Cuenta</h2>
            <br/><br/>
            <h3>Ingresa tu correo electrónico para buscar tu cuenta.</h3>
            <br/>
            <input type="email" placeholder="Correo electrónico"></input>
            <br/><br/>
            <Link to="/login"><button type="submit">Cancelar</button></Link>
            <Link to="/changePassword"><button type="submit">Buscar</button></Link>
        </div>
    )
}