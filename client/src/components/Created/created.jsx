import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postPhone } from "../../Actions/index";
import { auth } from "../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export default function PhoneCreate(props) {
  const [user, setUser] = useState(auth.currentUser);
  const history = useHistory();

  useEffect(() => {
    userVerificate();
  }, [user]);

  const userVerificate = async () => {
    await onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser || currentUser.email !== props.userRole) {
        history.push("/home");
      }
    });
  };

  const dispatch = useDispatch();

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

  function handleOnChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleBrand(e) {
    setInput({
      ...input,
      brand: e.target.value,
    });
  }
  function handleRAM(e) {
    setInput({
      ...input,
      ram: e.target.value,
    });
  }
  function handleROM(e) {
    setInput({
      ...input,
      rom: e.target.value,
    });
  }
  function handleNetwork(e) {
    setInput({
      ...input,
      network: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postPhone(input));
    alert("the Phone has been created successfully");
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
    });
  }

  return (
    <div>
      <Link to="/admin">
        <button>◀ Back</button>
      </Link>
      <div class="border border-sky-500 w-50 center">
        <form class="w-full max-w-lg" onSubmit={(e) => handleSubmit(e)}>
          <div class="flex flex-wrap-mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Brand</h5>
                <select
                  defaultValue="select Brand"
                  class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
              </label>
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Model</h5>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={input.model}
                  name="model"
                  onChange={(e) => handleOnChange(e)}
                />
              </label>
            </div>
          </div>
          <div class="flex flex-wrap -mx-0 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                <h5> Price in $</h5>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                  value={input.price}
                  name="price"
                  onChange={(e) => handleOnChange(e)}
                />
              </label>
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Stock</h5>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                  value={input.stock}
                  name="stock"
                  onChange={(e) => handleOnChange(e)}
                />
              </label>
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Images</h5>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={input.images}
                  name="images"
                  onChange={(e) => handleOnChange(e)}
                />
              </label>
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Color</h5>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={input.color}
                  name="color"
                  onChange={(e) => handleOnChange(e)}
                />
              </label>
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Rating</h5>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                  value={input.rating}
                  name="rating"
                  onChange={(e) => handleOnChange(e)}
                />
              </label>
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Inches</h5>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                  value={input.inches}
                  name="inches"
                  onChange={(e) => handleOnChange(e)}
                />
              </label>
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>RAM</h5>
                <select
                  defaultValue="select RAM"
                  class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  onChange={(e) => handleRAM(e)}
                >
                  <option disabled> select RAM </option>
                  <option value="4Gb">4Gb</option>
                  <option value="6Gb">6Gb</option>
                  <option value="8Gb">8Gb</option>
                  <option value="12Gb">12Gb</option>
                </select>
              </label>
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>ROM</h5>
                <select
                  defaultValue="select ROM"
                  class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  onChange={(e) => handleROM(e)}
                >
                  <option disabled> select ROM </option>
                  <option value="32Gb">32Gb</option>
                  <option value="64Gb">64Gb</option>
                  <option value="128Gb">128Gb</option>
                  <option value="256Gb">256Gb</option>
                </select>
              </label>
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Processor</h5>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={input.processor}
                  name="processor"
                  onChange={(e) => handleOnChange(e)}
                />
              </label>
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Resolution</h5>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="ancho X alto"
                  value={input.resolution}
                  name="resolution"
                  onChange={(e) => handleOnChange(e)}
                />
              </label>
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Network</h5>
                <select
                  defaultValue="select Network"
                  class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  onChange={(e) => handleNetwork(e)}
                >
                  <option disabled> select Network </option>
                  <option value="3G">3G</option>
                  <option value="4G">4G</option>
                  <option value="5G">5G</option>
                </select>
              </label>
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Batery</h5>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                  value={input.batery}
                  name="batery"
                  onChange={(e) => handleOnChange(e)}
                />
              </label>
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Frontal Camera</h5>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                  value={input.frontal_cam}
                  name="frontal_cam"
                  onChange={(e) => handleOnChange(e)}
                />
              </label>
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Main Camera</h5>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={input.main_cam}
                  name="main_cam"
                  onChange={(e) => handleOnChange(e)}
                />
              </label>
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Screen</h5>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  value={input.screen}
                  name="screen"
                  onChange={(e) => handleOnChange(e)}
                />
              </label>
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                {" "}
                <h5>Release Date</h5>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="date"
                  value={input.released}
                  name="releaseDate"
                  onChange={(e) => handleOnChange(e)}
                />
              </label>
            </div>
          </div>
          <button
            class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Crear
          </button>
        </form>
      </div>
    </div>
  );
}
