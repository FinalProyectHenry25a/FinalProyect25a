import React from 'react'
import { Link } from 'react-router-dom';
import style from "./../Admin/Admin.module.css"

const BannedUser = () => {
  return (
    <div d-flex justify-content-center align-items-center>
      <Link to="/home">
        <button style={{ marginBottom: "2em" }} className={style.btn}>
          Volver
        </button>
      </Link>
      <div className="container-fluid border rounded w-75  'd-flex justify-content-center align-items-center' ">
        <h6 className="p-4  d-flex justify-content-center align-items-center">
          Lo sentimos, ha sido inhabilitado por no cumplir nuestras normas de
          convivencia, en caso de reclamo dirigirse a información de contacto.
        </h6>
      </div>
    </div>
  );
}

export default BannedUser