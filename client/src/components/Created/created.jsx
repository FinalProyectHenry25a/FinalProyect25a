import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser, postPhone } from "../../Actions/index";
import { auth } from "../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export default function PhoneCreate() {

  const dispatch = useDispatch();
  const [error,setError] = useState({});
  const [fotoP, setFotoP] = useState('');
  const [fotosSec, setFotosSec] = useState([]);
  const history = useHistory();

  useEffect(() => {
    userVerificate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userVerificate = async () => {

    await onAuthStateChanged(auth, async (currentUser) => {

      try {

        let info = await dispatch(getUser(currentUser.email))

        if(!info.payload.isAdmin){

          history.push("/home");

        }
    
      } catch (error) {

        console.log(error);
        
      }

    });
  };

  const [input, setInput] = useState({
    brand: "",
    model: "",
    releaseDate: "",
    rating: "",
    price: "",
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
    stock: "",
  });

  function validation (input){
    let error = {}
    if (input.brand.length<1) error.brand = "Selecciona la marca del celular"
    if (!input.model) error.model = "Ingresa el modelo de celular"
    if (!input.releaseDate) error.releaseDate = "Selecciona la fecha de lanzamiento del celular"
    if (input.rating<1 || input.rating>5) error.rating = "Asigna un rating valido (de 1 a 5) para el celular"
    if (input.price<=0) error.price = "El precio del celular debe ser mayor que $0"
    if (!input.images) error.images = "Ingresa al menos una imagen del celular"
    if (!input.color) error.color = "Ingresa el color del celular"
    if (!input.processor) error.processor = "Ingresa el procesador de celular"
    if (input.ram.length<1) error.ram = "Selecciona la memoria ram del celular"
    if (input.rom.length<1) error.rom = "Selecciona la memoria rom del celular"
    if (input.network.length<1) error.network = "Selecciona la conectividad del celular"
    if (!input.batery) error.batery = "Ingresa la bateria del celular"
    if (!input.frontal_cam) error.frontal_cam = "Ingresa los mpx de la camara frontal del celular"
    if (!input.main_cam) error.main_cam = "Ingresa los mpx de la camara trasera del celular"
    if (!input.inches) error.inches = "Ingresa las pulgadas del celular"
    if (!input.screen) error.screen = "Ingresa el modelo de pantalla del celular"
    if (input.stock<=0) error.stock = "El stock del celular debe ser mayor a 0 productos"
    if (!input.resolution) error.resolution = "Ingresa la resolucion del celular"
    if (!input.resolution.includes(' X ') && !input.resolution.includes(' x ')) error.resolution = "Ingresa la resolucion del celular de la manera indicada (ancho X alto)"
    return error
}

  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    setError(validation({
      ...input,
     [e.target.name]: e.target.value
   }))
   //console.log(error)
  }

  function handleBrand(e) {
    setInput({
      ...input,
      brand: e.target.value,
    })
    setError(validation({
        ...input,
        brand:[...input.brand, e.target.value]
     }))
  }

  function handleRAM(e) {
    setInput({
      ...input,
      ram: e.target.value,
    })
    setError(validation({
        ...input,
        ram:[...input.ram, e.target.value]
     }))
  }
  function handleROM(e) {
    setInput({
      ...input,
      rom: e.target.value,
    })
    setError(validation({
        ...input,
        rom:[...input.rom, e.target.value]
     }))
  }
  function handleNetwork(e) {
    setInput({
      ...input,
      network: e.target.value,
    })
    setError(validation({
        ...input,
        network:[...input.network, e.target.value]
     }))
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
    error.model ||
    error.releaseDate ||
    error.rating ||
    error.price ||
    error.images ||
    error.color ||
    error.processor ||
    error.ram || 
    error.rom ||
    error.network ||
    error.batery ||
    error.frontal_cam ||
    error.main_cam || 
    error.inches ||
    error.screen ||
    error.stock ||
    error.resolution
 ){alert ("No se creo la publicacion, revisa bien los campos weon")
} else {

  //console.log(input);





    dispatch(postPhone(input));
    alert("La publicacion se creo exitosamente");
    setInput({
      brand: "",
      model: "",
      releaseDate: "",
      rating: "",
      price: "",
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
      stock: "",
 });}
  }


  const base64Convert = (ev) => {
    let file = ev.target.files[0];

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = async function () {
      let base64 = fileReader.result;
      setFotoP(base64);
      setInput({ ...input, images: base64 }); 
    };
  };

  const base64Multiple = (ev) => {
    let file = ev.target.files[0];

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = async function () {
      let base64 = fileReader.result;
      setFotosSec([...fotosSec, base64]);
      setInput({ ...input, imagesadditionalphotos: fotosSec }); //tendria q ver esta ruta para q me agregue
    };                                                          // y tb si sale todo el input con las fotos
  };

  return (
    <div>
      <Link to="/admin">
        <button>◀ Back</button>
      </Link>
      <div className="border border-sky-500 w-50 center">
        <form className="w-full max-w-lg" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-wrap-mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Brand</h5>
                <select
                  defaultValue="select Brand"
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  onChange={(e) => handleBrand(e)}
                >
                  <option disabled> select Brand </option>
                  <option value="Samsung">Samsung</option>
                  <option value="Apple">Apple</option>
                  <option value="Huawei">Huawei</option>
                  <option value="Oppo">Oppo</option>
                  <option value="Motorola">Motorola</option>
                  <option value="Xiaomi">Xiaomi</option>
                </select>
                {error.brand && <p>{error.brand}</p>}
              </label>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Model</h5>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={input.model}
                  name="model"
                  onChange={(e) => handleOnChange(e)}
                />{error.model && <p>{error.model}</p>}
              </label>
            </div>
          </div>
          <div className="flex flex-wrap -mx-0 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                <h5> Price in $</h5>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                  value={input.price}
                  name="price"
                  onChange={(e) => handleOnChange(e)}
                />{error.price && <p>{error.price}</p>}
              </label>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Stock</h5>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                  value={input.stock}
                  name="stock"
                  onChange={(e) => handleOnChange(e)}
                />{error.stock && <p>{error.stock}</p>}
              </label>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Imagen principal</h5>

                      <input
                        type="file"
                        onChange={(ev) => base64Convert(ev)}
                        required
                      />
                      <br/>
                      {fotoP !== '' ? <img src={fotoP} width="50" height="60" alt="no se pudo cargar la imagen" /> : null}

                <h5>Imagenes secundarias (máximo 3)</h5>  
                      {fotosSec?.length <= 2 ?
                        <input
                        type="file"
                        onChange={(ev) => base64Multiple(ev)}
                        required
                      /> : null }
               
                      {fotosSec?.length >= 1?
                      <div> {fotosSec.map( el => <img src={el} width="50" height="60" alt="no se pudo cargar la imagen" />)} </div>       
                      :null}
  
                  
                {error.images && <p>{error.images}</p>}
              </label>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Color</h5>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={input.color}
                  name="color"
                  onChange={(e) => handleOnChange(e)}
                />{error.color && <p>{error.color}</p>}
              </label>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Rating</h5>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                  value={input.rating}
                  name="rating"
                  onChange={(e) => handleOnChange(e)}
                />{error.rating && <p>{error.rating}</p>}
              </label>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Inches</h5>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                  value={input.inches}
                  name="inches"
                  onChange={(e) => handleOnChange(e)}
                />{error.inches && <p>{error.inches}</p>}
              </label>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>RAM</h5>
                <select
                  defaultValue="select RAM"
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  onChange={(e) => handleRAM(e)}
                >
                  <option disabled> select RAM </option>
                  <option value="4Gb">4Gb</option>
                  <option value="6Gb">6Gb</option>
                  <option value="8Gb">8Gb</option>
                  <option value="12Gb">12Gb</option>
                </select>{error.ram && <p>{error.ram}</p>}
              </label>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>ROM</h5>
                <select
                  defaultValue="select ROM"
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  onChange={(e) => handleROM(e)}
                >
                  <option disabled> select ROM </option>
                  <option value="32Gb">32Gb</option>
                  <option value="64Gb">64Gb</option>
                  <option value="128Gb">128Gb</option>
                  <option value="256Gb">256Gb</option>
                </select>{error.rom && <p>{error.rom}</p>}
              </label>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Processor</h5>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={input.processor}
                  name="processor"
                  onChange={(e) => handleOnChange(e)}
                />{error.processor && <p>{error.processor}</p>}
              </label>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Resolution</h5>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="ancho X alto"
                  value={input.resolution}
                  name="resolution"
                  onChange={(e) => handleOnChange(e)}
                />{error.resolution && <p>{error.resolution}</p>}
              </label>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Network</h5>
                <select
                  defaultValue="select Network"
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  onChange={(e) => handleNetwork(e)}
                >
                  <option disabled> select Network </option>
                  <option value="3G">3G</option>
                  <option value="4G">4G</option>
                  <option value="5G">5G</option>
                </select>{error.network && <p>{error.network}</p>}
              </label>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Batery</h5>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                  value={input.batery}
                  name="batery"
                  onChange={(e) => handleOnChange(e)}
                />{error.batery && <p>{error.batery}</p>}
              </label>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Frontal Camera</h5>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                  value={input.frontal_cam}
                  name="frontal_cam"
                  onChange={(e) => handleOnChange(e)}
                />{error.frontal_cam && <p>{error.frontal_cam}</p>}
              </label>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Main Camera</h5>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={input.main_cam}
                  name="main_cam"
                  onChange={(e) => handleOnChange(e)}
                />{error.main_cam && <p>{error.main_cam}</p>}
              </label>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Screen</h5>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={input.screen}
                  name="screen"
                  onChange={(e) => handleOnChange(e)}
                />{error.screen && <p>{error.screen}</p>}
              </label>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Release Date</h5>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="date"
                  value={input.releaseDate}
                  name="releaseDate"
                  onChange={(e) => handleOnChange(e)}
                />{error.releaseDate && <p>{error.releaseDate}</p>}
              </label>
            </div>
          </div>
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Crear
          </button>
        </form>
      </div>
    </div>
  );
}