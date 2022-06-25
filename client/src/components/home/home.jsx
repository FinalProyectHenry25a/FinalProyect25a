import React, { useState } from "react";
import { useEffect } from 'react';
import Card from '../card/Card'
import { useDispatch, useSelector} from 'react-redux';
import Carrousel from "../carrousel/Carrousel";
import style from './../home/Home.module.css'
import NavBar from "../NavBar/NavBar";
import { filters, getPhones } from "../../Actions/index";
import Paginado from "../Paginate/paginate";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase/firebase-config';


const Home = () => {
  const dispatch = useDispatch();
  const allPhones = useSelector(state => state.phones)

  const [filtered, setFiltered] = useState ({
     byRom: null,
     byRam: null,
     byBrand: null,
     byPrice: null,
     byNetwork: null,
     byProcessor: null,
     byOrder: null
    })

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


  function filtersSetters (e){
      
      let price = document.getElementById('price').value 
      if (price === 'null'){ price = null}
      else {
        price = document.getElementById('price').value.split(',') 
        price =[  parseInt (document.getElementById('price').value.split(',')[0]) ,   parseInt (document.getElementById('price').value.split(',')[1])]
      }

    setFiltered(() => ({
      byBrand: document.getElementById('brand').value === 'null' ? null : document.getElementById('brand').value,
      byRom:  document.getElementById('rom').value === 'null' ? null : document.getElementById('rom').value,
      byRam:  document.getElementById('ram').value === 'null' ? null : document.getElementById('ram').value,
      byNetwork: document.getElementById('network').value === 'null' ? null : document.getElementById('network').value,
      byOrder: document.getElementById('order').value === 'null' ? null : document.getElementById('order').value,
      byPrice: price, 
      byProcessor: document.getElementById('processor').value === '' ? null : document.getElementById('processor').value,
     }))

     
     setCurrentPage(1)
    }
    
    const send = async () => {
      dispatch(filters(filtered));

      console.log("log->",currentPhones);
    };
  
    const DiceSiEstaEnSesion = () => {
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) console.log("Sesion abierta", currentUser.email);
        else console.log("Sesion cerrada");
      });
    };

  return(
        <div>
          <button onClick={DiceSiEstaEnSesion}> tengo sesion abierta? </button>
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

<select id = 'brand' onChange={e=>filtersSetters(e)}>
              <option value="null">Todas</option>
              <option value="Samsung">Samsung</option>
              <option value="Apple">Apple</option>
              <option value="Motorola">Motorola</option>
              <option value="Xiaomi">Xiaomi</option>
              <option value="Huawei">Huawei</option>
            </select>


            {/* por Ram--------------------------------------------------- */}

            <select id='ram' onChange={e=>filtersSetters(e)}>
              <option value='null'>Ram</option>
              <option value="4Gb">4Gb</option>
              <option value="6Gb">6Gb</option>
              <option value="8Gb">8Gb</option>
              <option value="12Gb">12Gb</option>
            </select>

            {/* por network----------------------------------------------- */}

            <select id='network' onChange={e=>filtersSetters(e)}>
              <option value='null'>Network</option>
              <option value="4G">4G</option>
              <option value="5G">5G</option>
            </select>

            {/* por Rom--------------------------------------------------- */}
            <select id='rom' onChange={e=>filtersSetters(e)}>
              <option value='null'>Rom</option>
              <option value="64Gb">64Gb</option>
              <option value="128Gb">128Gb</option>
              <option value="256Gb">256Gb</option>
            </select>

             {/* por orden--------------------------------------------------- */}

             <select id='order' onChange={e=>filtersSetters(e)}>
              <option value='null'>Por defecto</option>
              <option value='rating'>Por puntuación</option>
              <option value='ascendingPrice'>Orden ascendiente</option>
              <option value="descendingPrice">Orden descendiente</option>
            </select>

             {/* por precio--------------------------------------------------- */}

             <select id='price' onChange={e=>filtersSetters(e)}>
              <option value='null'>precio</option>
              <option value={[0, 500]}>de u$ 0 a u$ 500</option>
              <option value={[500, 1000]}>de u$ 500 a u$ 1000</option>
              <option value={[1000, 1500]}>de u$ 1000 a u$ 1500</option>
            </select>

             {/* por processor--------------------------------------------------- */}
            <input id='processor' onChange={e=>filtersSetters(e)}></input>
            <label>buscar por procesador</label>  




           <br/>
           <button onClick={ () => send() }>Buscar</button>

{/* filtrado************************************ */}
            <div className={style.flex}>
            {currentPhones && allPhones.length ? (
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
              <h1>No se encontraron artículos con esas características</h1>
            </div>
          )}
        </div>
        </div>
    )
}

export default Home;