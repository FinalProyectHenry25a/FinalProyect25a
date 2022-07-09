import React from 'react'
import { Link } from "react-router-dom";
import styles from './BtnBack.module.css'

const BtnBack = () => {
  return (
    <>
        <Link to='/home' className={styles.link}>
            <button className={styles.btn}>
              Volver
            </button>
        </Link>
    </>
  )
}

export default BtnBack