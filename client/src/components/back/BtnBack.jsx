import React from 'react'
import { Link } from "react-router-dom";
import styles from './BtnBack.module.css'

const BtnBack = () => {
  return (
    <>
    <button className={styles.btn}>
        <Link to='/home' className={styles.link}>Volver</Link>
    </button>
    </>
  )
}

export default BtnBack