import React, { useState } from "react";
import { useEffect } from "react";
import Card from "../card/Card";
import { useDispatch, useSelector } from "react-redux";
import Carrousel from "../carrousel/Carrousel";
import style from "./../home/Home.module.css";
import NavBar from "../NavBar/NavBar";
import { clearCart, emptyCart, filters, getLocalCart, getLocalFilter, getPhones, getUser } from "../../Actions/index";
import Paginado from "../Paginate/paginate";
import UserNavBar from "../UserNavBar/UserNavBar";
import { onAuthStateChanged, reload, signOut } from "firebase/auth";
import axios from "axios";
import { auth } from "../../firebase/firebase-config";
import { right } from "@popperjs/core";
import SearchBar from "../SearchBar/Searchbar";

// const cartFromLocalStore = JSON.parse(localStorage.getItem("cart") || "[]")

const Home = () => {

  const [loggedUser, setLoggedUser] = useState();

  useEffect(() => {

    verificarQueHayaUsuarioLogueado();


       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {

    dispatch(getLocalCart())

  }, [])

  const dispatch = useDispatch();

  const allPhones = useSelector((state) => state.phones);
  const filtrados = useSelector((state) => state.filtered)

 
  

  const verificarQueHayaUsuarioLogueado = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
     
        let info = await dispatch(getUser(currentUser.email))

        if(info.payload.emptyCart) {

          dispatch(clearCart(info.payload.email));

        } 

        if(currentUser.emailVerified){

          await axios.put(`http://localhost:3001/verification/${currentUser.email}`)

        }
        setLoggedUser(info.payload);
      }
    });
  };

  const [filtered, setFiltered] = useState({
    byRom: null,
    byRam: null,
    byBrand: null,
    byPrice: null,
    byNetwork: null,
    byProcessor: null,
    byOrder: null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [phonesPerPage] = useState(4);
  const indexOfLastPhones = currentPage * phonesPerPage;
  const indexOfFirstPhones = indexOfLastPhones - phonesPerPage;

 const cart = useSelector(state => state.cart)
  const currentPhones = allPhones.slice(indexOfFirstPhones, indexOfLastPhones);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  useEffect(() => {
    (!filtrados?
    dispatch(getPhones()):console.log("casi"));
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtrados]);

  function filtersSetters(e) {
    let price = document.getElementById("price").value;
    if (price === "null") {
      price = null;
    } else {
      price = document.getElementById("price").value.split(",");
      price = [
        parseInt(document.getElementById("price").value.split(",")[0]),
        parseInt(document.getElementById("price").value.split(",")[1]),
      ];
    }

    setFiltered(() => ({
      byBrand:
        document.getElementById("brand").value === "null"
          ? null
          : document.getElementById("brand").value,
      byRom:
        document.getElementById("rom").value === "null"
          ? null
          : document.getElementById("rom").value,
      byRam:
        document.getElementById("ram").value === "null"
          ? null
          : document.getElementById("ram").value,
      byNetwork:
        document.getElementById("network").value === "null"
          ? null
          : document.getElementById("network").value,
      byOrder:
        document.getElementById("order").value === "null"
          ? null
          : document.getElementById("order").value,
      byPrice: price,
      byProcessor:
        document.getElementById("processor").value === "null"
          ? null
          : document.getElementById("processor").value,
    }));

   
  }
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])
  
  useEffect(()=>{
    let prueba=localStorage.getItem("filter")
    prueba?(
      dispatch(getLocalFilter())
  ):(dispatch(getPhones()))},[])



  const send = async (e) => {
     dispatch(filters(filtered));
    setCurrentPage(1);   
  
  };

  const clearFilter =(e) => {

    document.getElementById("brand").value = "null"
    document.getElementById("rom").value = "null"
    document.getElementById("price").value = "null"
    document.getElementById("ram").value = "null"
    document.getElementById("network").value = "null"
    document.getElementById("order").value = "null"
    document.getElementById("processor").value = "null"

    let clear={
      byBrand:null,
      byRom: null,
      byRam:null,
      byNetwork:null,
      byOrder: null,
      byPrice: null,
      byProcessor:null,
    }

    localStorage.removeItem("filter")
    dispatch(filters(clear));
    setCurrentPage(1);
    
  };

  const logout = async () => {
    await signOut(auth);
  };

  console.log(auth.currentUser);

  return (
    <div>
       
      <button onClick={logout}>desloguear</button>

      {/* <Link to="/agregado">
        <button>Agregar Phone</button>
      </Link> */}

      {loggedUser ? <UserNavBar setCurrentPage={setCurrentPage} /> : <NavBar setCurrentPage={setCurrentPage} />}
      {/* <Carrousel /> */}
      
      <div id="filtros">
      <select id='brand' className="form-select form-select-m mb-3 mt-5 text-truncate" aria-label=".form-select-m example" style={{ width: 12 + "%", display: "inline-block", margin: 3 + "px" }} onChange={e => filtersSetters(e)}>
        <option value="null">Todas</option>
        <option value="Samsung">Samsung</option>
        <option value="Apple">Apple</option>
        <option value="Motorola">Motorola</option>
        <option value="Xiaomi">Xiaomi</option>
        <option value="Huawei">Huawei</option>
      </select>

      {/* por Ram--------------------------------------------------- */}
      <select id="ram" className="form-select form-select-m mb-3 text-truncate" aria-label=".form-select-m example" style={{ width: 12 + "%", display: "inline-block", margin: 3 + "px" }} onChange={(e) => filtersSetters(e)}>
        <option value="null">Ram</option>
        <option  value="4Gb">4Gb</option>
        <option value="6Gb">6Gb</option>
        <option value="8Gb">8Gb</option>
        <option value="12Gb">12Gb</option>
      </select>
      {/* por network----------------------------------------------- */}

      <select id="network" className="form-select form-select-m mb-3 text-truncate" aria-label=".form-select-m example" style={{ width: 12 + "%", display: "inline-block", margin: 3 + "px" }} onChange={(e) => filtersSetters(e)}>
        <option  value="null">Network</option>
        <option value="4G">4G</option>
        <option value="5G">5G</option>
      </select>

      {/* por Rom--------------------------------------------------- */}
      <select id="rom" className="form-select form-select-m mb-3 text-truncate" aria-label=".form-select-m example" style={{ width: 12 + "%", display: "inline-block", margin: 3 + "px" }} onChange={(e) => filtersSetters(e)}>
        <option  value="null">Rom</option>
        <option value="64Gb">64Gb</option>
        <option value="128Gb">128Gb</option>
        <option value="256Gb">256Gb</option>
      </select>

      {/* por orden--------------------------------------------------- */}

      <select id="order" className="form-select form-select-m mb-3 text-truncate" aria-label=".form-select-m example" style={{ width: 12 + "%", display: "inline-block", margin: 3 + "px" }} onChange={(e) => filtersSetters(e)}>
        <option  value="null">Por defecto</option>
        <option value="rating">Por puntuación</option>
        <option value="ascendingPrice">Orden ascendiente</option>
        <option value="descendingPrice">Orden descendiente</option>
      </select>

      {/* por precio--------------------------------------------------- */}

      <select id="price" className="form-select form-select-m mb-3 text-truncate" aria-label=".form-select-m example" style={{ width: 12 + "%", display: "inline-block", margin: 3 + "px" }} onChange={(e) => filtersSetters(e)}>
        <option  value="null">precio</option>
        <option value={[0, 500]}>de u$ 0 a u$ 500</option>
        <option value={[500, 1000]}>de u$ 500 a u$ 1000</option>
        <option value={[1000, 1500]}>de u$ 1000 a u$ 1500</option>
      </select>

      {/* por processor--------------------------------------------------- */}
      {/* <div style={{ display: "inline-flex", margin: 3 + "px" }}> */}
        <select id="processor" className="form-select form-select-m mb-3 text-truncate" aria-label=".form-select-m example" style={{ width: 12 + "%", display: "inline-block", margin: 3 + "px" }} onChange={(e) => filtersSetters(e)}>
        <option  value= "null" >Procesador</option>
        <option value="Snapdragon">Snapdragon</option>
        <option value="Exynos">Exynos</option>
        <option value="Mediatek">Mediatek</option>
        <option value="Kirin">Kirin</option>
        <option value="Apple">Apple</option>
        </select>


        <button className={style.btn} onClick={() => send()}>Buscar</button>
        <button className={style.btn} onClick={() => clearFilter()}>Limpiar filtros</button>
        </div>
      {/* </div> */}
      {/* filtrado************************************ */}
      <div className={style.flex}>
        {currentPhones && allPhones.length ? (
          currentPhones?.map((e) => {
            return (
              <div key={e.id}>
                <Card
                  brand={e.brand}
                  model={e.model}
                  images={e.images}
                  price={e.price}
                  id={e.id}
                  stock={e.stock}
                  />
                  
              </div>
            );
          })
        ) : (
          <div>
            <h1>No se encontraron artículos con esas características</h1>
          </div>
        )}      
      </div>
      <br />
      <Paginado
        phonesPerPage={phonesPerPage}
        allPhones={allPhones.length}
        paginado={paginado}
      />
    </div>
  );
};

export default Home;
