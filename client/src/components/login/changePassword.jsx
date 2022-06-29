import React from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../../Actions";
import { useHistory } from "react-router-dom";

export default function ChangePassword(){

    const dispatch = useDispatch();
    const history = useHistory();

    const handlerSubmit = (e) => {
        e.preventDefault();
        dispatch(changePassword())
        alert("se cambio la contraseña con exito")
        history.push("/home")
    }

    return (
        <div>
            <h2>Cambiar la Contraseña</h2>
            <br/>
            <label>Nueva Contraseña</label>
            <input type="password" ></input>
            <br/><br/>
            <label>Repetir la Contraseña</label>
            <input type="password"></input>
            <br/><br/>
            <button type="submit" onClick={() => handlerSubmit()}>Cambiar Contraseña</button>
        </div>
    )
}