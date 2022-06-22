import React from "react";
import { useEffect } from 'react';
import Card from '../card/Card'
import { useDispatch, useSelector} from 'react-redux';
import Carrousel from "../carrousel/Carrousel";
import style from './../home/Home.module.css'
import NavBar from "../NavBar/NavBar";
import { getPhones } from "../../Actions/index";

const Home = () => {
  const dispatch = useDispatch();
  const allPhones = useSelector(state => state.phones)

  
  useEffect(()=>{
    dispatch(getPhones())
    console.log('hola')
  },[dispatch])

  console.log('algo', allPhones)
  return(
        <div>
            <NavBar/>
            <Carrousel/>
            <div className={style.flex}>
            {allPhones ? (
            allPhones?.map(e => {
              return (
                <div key={e.id}>
                    <Card
                      brand={e.brand}
                      model={e.model}
                      images={e.images}
                      price={e.price}
                      />
                </div>
              );
            })
            ) 
            : (
              <div>
              <h1>Loading...</h1>
            </div>
          )}
        </div>
        </div>
    )
}

export default Home;