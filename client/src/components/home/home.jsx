import React, { useState } from "react";
import { useEffect } from "react";
import Card from "../card/Card";
import { useDispatch, useSelector } from "react-redux";
import Carrousel from "../carrousel/Carrousel";
import style from "./../home/Home.module.css";
import NavBar from "../NavBar/NavBar";
import { filters, getPhones } from "../../Actions/index";
import Paginado from "../Paginate/paginate";
import { Link } from "react-router-dom";
import UserNavBar from "../UserNavBar/UserNavBar";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import axios from "axios";
import { right } from "@popperjs/core";

const Home = () => {
  const [loggedUser, setLoggedUser] = useState();

  useEffect(() => {
    verificarQueHayaUsuarioLogueado();
  }, []);

  const dispatch = useDispatch();

  const allPhones = useSelector((state) => state.phones);

  const verificarQueHayaUsuarioLogueado = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        let user = await axios.get(
          `http://localhost:3001/userCreator/${currentUser.email}`
        );
        setLoggedUser(user.data);
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

  const currentPhones = allPhones.slice(indexOfFirstPhones, indexOfLastPhones);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPhones());
  }, [dispatch]);

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
        document.getElementById("processor").value === ""
          ? null
          : document.getElementById("processor").value,
    }));

   
  }

  const send = async (e) => {
    dispatch(filters(filtered));
    setCurrentPage(1);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <button onClick={logout}>desloguear</button>

      <Link to="/agregado">
        <button>Agregar Phone</button>
      </Link>
      {loggedUser ? <UserNavBar /> : <NavBar />}
      <Carrousel />

      <select id='brand' className="form-select form-select-m mb-3" aria-label=".form-select-m example" style={{ width: 12 + "%", display: "inline-block", margin: 3 + "px" }} onChange={e => filtersSetters(e)}>
        <option value="null">Todas</option>
        <option value="Samsung">Samsung</option>
        <option value="Apple">Apple</option>
        <option value="Motorola">Motorola</option>
        <option value="Xiaomi">Xiaomi</option>
        <option value="Huawei">Huawei</option>
      </select>

      {/* por Ram--------------------------------------------------- */}
      <select id="ram" className="form-select form-select-m mb-3" aria-label=".form-select-m example" style={{ width: 12 + "%", display: "inline-block", margin: 3 + "px" }} onChange={(e) => filtersSetters(e)}>
        <option value="null">Ram</option>
        <option selected value="4Gb">4Gb</option>
        <option value="6Gb">6Gb</option>
        <option value="8Gb">8Gb</option>
        <option value="12Gb">12Gb</option>
      </select>
      {/* por network----------------------------------------------- */}

      <select id="network" className="form-select form-select-m mb-3" aria-label=".form-select-m example" style={{ width: 12 + "%", display: "inline-block", margin: 3 + "px" }} onChange={(e) => filtersSetters(e)}>
        <option selected value="null">Network</option>
        <option value="4G">4G</option>
        <option value="5G">5G</option>
      </select>

      {/* por Rom--------------------------------------------------- */}
      <select id="rom" className="form-select form-select-m mb-3" aria-label=".form-select-m example" style={{ width: 12 + "%", display: "inline-block", margin: 3 + "px" }} onChange={(e) => filtersSetters(e)}>
        <option selected value="null">Rom</option>
        <option value="64Gb">64Gb</option>
        <option value="128Gb">128Gb</option>
        <option value="256Gb">256Gb</option>
      </select>

      {/* por orden--------------------------------------------------- */}

      <select id="order" className="form-select form-select-m mb-3" aria-label=".form-select-m example" style={{ width: 12 + "%", display: "inline-block", margin: 3 + "px" }} onChange={(e) => filtersSetters(e)}>
        <option selected value="null">Por defecto</option>
        <option value="rating">Por puntuación</option>
        <option value="ascendingPrice">Orden ascendiente</option>
        <option value="descendingPrice">Orden descendiente</option>
      </select>

      {/* por precio--------------------------------------------------- */}

      <select id="price" className="form-select form-select-m mb-3" aria-label=".form-select-m example" style={{ width: 12 + "%", display: "inline-block", margin: 3 + "px" }} onChange={(e) => filtersSetters(e)}>
        <option selected value="null">precio</option>
        <option value={[0, 500]}>de u$ 0 a u$ 500</option>
        <option value={[500, 1000]}>de u$ 500 a u$ 1000</option>
        <option value={[1000, 1500]}>de u$ 1000 a u$ 1500</option>
      </select>

      {/* por processor--------------------------------------------------- */}
      <div style={{ display: "inline-flex", margin: 3 + "px" }}>
        <input id="processor" className="form-control me-3" placeholder="busca por procesador" type="search" style={{ width: 100 + "%" }} onChange={(e) => filtersSetters(e)}></input>
        <button className="btn btn-outline-dark" onClick={() => send()}>Buscar</button>
      </div>
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
