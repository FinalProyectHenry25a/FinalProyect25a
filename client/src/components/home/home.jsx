import React, { useState } from "react";
import { useEffect } from 'react';
import Card from '../card/Card'
import { useDispatch, useSelector} from 'react-redux';
import Carrousel from "../carrousel/Carrousel";
import style from './../home/Home.module.css'
import NavBar from "../NavBar/NavBar";
import { filterByBrand, filterByRam, filterOrder, getPhones } from "../../Actions/index";
import Paginado from "../Paginate/paginate";
import { Link } from "react-router-dom";


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
  },[dispatch])


  function handlerFilderByBrand (e){
   dispatch(filterByBrand(e.target.value))
   setCurrentPage(1)
  }

  function handlerFilderByRam (e){
    dispatch(filterByRam(e.target.value))
    setCurrentPage(1)
   }


  return(
        <div>
          <Link to='/agregado'><button>Agregar Phone</button></Link>
            <NavBar/>
            <Carrousel/>

              <Paginado
                  phonesPerPage={phonesPerPage}
                  allPhones={allPhones.length}
                  paginado={paginado}
              />
{/* filtrado************************************ */}
{/* por marca-------------------------------------------- */}

            <button name="Samsung" value="Samsung" onClick={handlerFilderByBrand}>Samsung</button>
            <button name="Apple" value="Apple" onClick={handlerFilderByBrand}>Apple</button>
            <button name="Motorola" value="Motorola" onClick={handlerFilderByBrand}>Motorola</button>
            <button name="Xiaomi" value="Xiaomi" onClick={handlerFilderByBrand}>Xiaomi</button>
            <button name="Huawei" value="Huawei" onClick={handlerFilderByBrand}>Huawei</button>

            {/* por Ram--------------------------------------------------- */}

            <select onChange={e=>handlerFilderByRam(e)}>
            <option value="All">Ram</option>
              <option value="4Gb">4Gb</option>
              <option value="6Gb">6Gb</option>
              <option value="8Gb">8Gb</option>
              <option value="12Gb">12Gb</option>
            </select>

{/* filtrado************************************ */}
            <div className={style.flex}>
            {currentPhones ? (
              currentPhones?.map(e => {
                return (
                  <div key={e.id}>
                    <Link to={"/home/" + e.id}>
                    <Card
                      brand={e.brand}
                      model={e.model}
                      images={e.images}
                      price={e.price}
                      />
                      </Link>
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