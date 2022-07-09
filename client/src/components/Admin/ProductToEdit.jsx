import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getDetails, editPost, getUser } from "../../Actions";
import { auth } from "../../firebase/firebase-config";

export default function ProductToEdit() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if(auth.currentUser === null){

     // history.push("/home");

    }
    userVerificate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userVerificate = async () => {
    await onAuthStateChanged(auth, async (currentUser) => {
      try {
        let info = await dispatch(getUser(currentUser.email));

        if (!info.payload.isAdmin || info.payload.banned) {
        //  history.push("/home");
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const PID = useSelector((state) => state.phonesId);

  const [state, setState] = useState({
    brand: PID.brand,
    releaseDate: PID.releaseDate,
    model: PID.model,
    price: PID.price,
    rating: PID.rating,
    images: PID.images,
    color: PID.color,
    processor: PID.processor,
    ram: PID.ram,
    rom: PID.rom,
    network: PID.network,
    batery: PID.batery,
    frontal_cam: PID.frontal_cam,
    main_cam: PID.main_cam,
    inches: PID.inches,
    screen: PID.screen,
    resolution: PID.resolution,
    additionalphotos: PID.additionalphotos
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  function handleRAM(e) {
    setState({
      ...state,
      ram: e.target.value,
    });
  }

  function handleROM(e) {
    setState({
      ...state,
      rom: e.target.value,
    });
  }

  function handleNetwork(e) {
    setState({
      ...state,
      network: e.target.value,
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(state);
    dispatch(editPost(id, state));
    alert("successfully");
    setState({
      brand: "",
      releaseDate: "",
      model: "",
      price: "",
      rating: "",
      images: "",
      color: "",
      processor: "",
      ram: "",
      rom: "",
      network: "",
      batery: "",
      frontal_cam: "",
      main_cam: "",
      inches: "",
      screen: "",
      resolution: "",
    });
   // history.push("/admin")
    window.location.reload()
    
  };



  const base64Convert = (ev) => {
    let file = ev.target.files[0];

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = async function () {
      let base64 = fileReader.result;

      //aca en base64 el archivo ya esta convertido a texto
      setState({ ...state, images: base64 });
    };
  };

  const editFotosSecundarias = (ev, index) => {
    let file = ev.target.files[0];

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = async function () {
      let base64 = fileReader.result;

      let arr = state.additionalphotos;
      let arrAux = [];

      for (let i = 0; i < arr.length; i++) {
        console.log("hola");
        if (i === index) arrAux.push(base64);
        else arrAux.push(arr[i]);
      }

      setState({ ...state, additionalphotos: arrAux });
    };
  };

  return (
    <div>
      <div>
        <label>brand</label>
        <input
          placeholder="Brand..."
          type="text"
          name="brand"
          id="brand"
          value={state.brand}
          required
          onChange={(e) => handleChange(e)}
        />
        {/*  <button type="submit" onClick={handlerBrand}>
            cambiar brand
          </button> */}
      </div>
      <div>
        <label>Release Date</label>
        <input
          placeholder="Release Date..."
          type="text"
          name="releaseDate"
          value={state.releaseDate}
          required
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label>Model</label>
        <input
          placeholder="Model..."
          type="text"
          name="model"
          value={state.model}
          required
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label>Price</label>
        <input
          placeholder="500..."
          type="number"
          name="price"
          value={state.price}
          required
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label>Rating</label>
        <input
          placeholder="4..."
          type="number"
          name="rating"
          value={state.rating}
          required
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label>Imagen principal</label>
        {/*   <input
            placeholder="Image..."
            type="text"
            name="images"
            value={state.images}
            required
            onChange={(e) => handleChange(e)}
          /> */}
        
        <br/>
        <img src={state.images} width="50" height="50" alt="no encontrada" />
        <input type="file" onChange={(ev) => base64Convert(ev)} required />
        <br/>

      </div>
      <div>
        <label>Imagenes secundarias</label>
        <br/>
        {state.additionalphotos?.map( (el,index) => 
          <div key={index}>
            <img src={el} width="50" height="50" alt="no encontrada" />
            
            <input type="file" onChange={(ev) => editFotosSecundarias(ev,index)} required />
            <br/>
            
          </div> )}
        

      </div>

      <div>
        <label>Color</label>
        <input
          placeholder="Midnight Blue..."
          type="text"
          name="color"
          value={state.color}
          required
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label>Processor</label>
        <input
          placeholder="Snapdragon..."
          type="text"
          name="processor"
          value={state.processor}
          required
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label>RAM</label>
        <select onChange={(e) => handleRAM(e)}>
          <option disabled> select RAM </option>
          <option value="4Gb">4Gb</option>
          <option value="6Gb">6Gb</option>
          <option value="8Gb">8Gb</option>
          <option value="12Gb">12Gb</option>
        </select>
      </div>
      <div>
        <label>ROM</label>
        <select onChange={(e) => handleROM(e)}>
          <option disabled> select ROM </option>
          <option value="32Gb">32Gb</option>
          <option value="64Gb">64Gb</option>
          <option value="128Gb">128Gb</option>
          <option value="256Gb">256Gb</option>
        </select>
      </div>
      <div>
        <label>Network</label>
        <select onChange={(e) => handleNetwork(e)}>
          <option disabled> select Network </option>
          <option value="3G">3G</option>
          <option value="4G">4G</option>
          <option value="5G">5G</option>
        </select>
      </div>
      <div>
        <label>Batery(mAh)</label>
        <input
          placeholder="4000..."
          type="number"
          name="batery"
          value={state.batery}
          required
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label>Frontal Camera</label>
        <input
          placeholder="48..."
          type="number"
          name="frontal_cam"
          value={state.frontal_cam}
          required
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label>Main Camera</label>
        <input
          placeholder="13..."
          type="number"
          name="main_cam"
          value={state.main_cam}
          required
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label>Inches (for screen)</label>
        <input
          placeholder="6.4..."
          type="number"
          name="inches"
          value={state.inches}
          required
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label>Screen (type)</label>
        <input
          placeholder="AMOLED..."
          type="text"
          name="screen"
          value={state.screen}
          required
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label>Resolution</label>
        <input
          placeholder="1080 x 2400..."
          type="text"
          name="resolution"
          value={state.resolution}
          required
          onChange={(e) => handleChange(e)}
        />
      </div>
      <button onClick={handleSubmit}>Aceptar</button>
    </div>
  );
}
