import React from "react";
import Card from '../card/Card'
import Carrousel from "../carrousel/Carrousel";
import style from './../home/Home.module.css'

const Home = () => {
    return(
        <div>
            <h1>HOME</h1>
            <Carrousel/>
            <div className={style.flex}>
                <Card
                  name="manu"
                  imagenes="https://www.perozzi.com.ar/26393-large_default/alcatel-telefono-celular-1-re-look-5033a-fltlara-00907234.jpg"
                  precio="300"
                />
                <Card
                  name="facu"
                  imagenes="https://www.perozzi.com.ar/26393-large_default/alcatel-telefono-celular-1-re-look-5033a-fltlara-00907234.jpg"
                  precio="3000"
                />
        </div>
        </div>
    )
}

export default Home;