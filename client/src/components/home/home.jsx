import React, { useState } from "react";
import { useEffect } from 'react';
import Card from '../card/Card'
import { useDispatch, useSelector} from 'react-redux';
import Carrousel from "../carrousel/Carrousel";
import style from './../home/Home.module.css'
import NavBar from "../NavBar/NavBar";
import { getPhones } from "../../Actions/index";
import Paginado from "../Paginate/paginate";

const Home = () => {
  const dispatch = useDispatch();
  const allPhones = useSelector(state => state.phones)

  const [currentPage, setCurrentPage] = useState(1);  
    const [phonesPerPage] = useState(4);
    const indexOfLastPhones = currentPage * phonesPerPage; 
    const indexOfFirstPhones = indexOfLastPhones - phonesPerPage;

    const currentPhones = allPhones.slice(
      indexOfFirstPhones,
        indexOfLastPhones
    );

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

  
  useEffect(()=>{
    dispatch(getPhones())
    console.log('hola')
  },[dispatch])

  
  return(
        <div>
            <NavBar/>
            <Carrousel/>

              <Paginado
                  phonesPerPage={phonesPerPage}
                  allPhones={allPhones.length}
                  paginado={paginado}
              />

            <div className={style.flex}>
            {currentPhones ? (
              currentPhones?.map(e => {
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