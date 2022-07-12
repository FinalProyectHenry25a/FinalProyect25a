import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { getDetails, editPost, getUser, cleanUp } from "../../Actions";
import { auth } from "../../firebase/firebase-config";

export default function ProductToEdit() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const PID = useSelector((state) => state.phonesId);
  const [state, setState] = useState({});

  useEffect(() => {
    userVerificate();
  }, []);

  const userVerificate = async () => {
    await onAuthStateChanged(auth, async (currentUser) => {
      let producto = await dispatch(getDetails(id));

      setState(producto.payload);
      if (currentUser === null) {
        history.push("/home");
      }
      try {
        let info = await dispatch(getUser(currentUser.email));

        if (!info.payload.isAdmin || info.payload.banned) {
          history.push("/home");
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

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

  const handleSubmit = async (e) => {
    console.log(state);
    dispatch(editPost(id, state));
    alert("Cambios guardados exitosamente");
    history.push("/admin/publicaciones");
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

  const addNewPicture = (ev) => {
    let file = ev.target.files[0];

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = async function () {
      let base64 = fileReader.result;

      let array = state.additionalphotos;
      array.push(base64);

      setState({ ...state, additionalphotos: array });
    };
  };

  const takeOut = (index) => {
    let arr = state.additionalphotos;
    let arrAux = [];

    for (let i = 0; i < arr?.length; i++) {
      if (i !== index) arrAux.push(arr[i]);
    }

    setState(() => ({ ...state, additionalphotos: arrAux }));
  };

  return (
    <div>
      <Link to="/admin/publicaciones">
        <button>Volver</button>
      </Link>

      <div>
        <label>Marca</label>
        <input
          placeholder={state.brand}
          type="text"
          name="brand"
          id="brand"
          required
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div>
        <label>Fecha de lanzamiento</label>
        <input
          placeholder={state.releaseDate}
          type="text"
          name="releaseDate"
          required
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div>
        <label>Modelo</label>
        <input
          placeholder={state.model}
          type="text"
          name="model"
          required
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div>
        <label>Precio</label>
        <input
          placeholder={state.price}
          type="number"
          name="price"
          required
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div>
        <label>Puntuación</label>
        <input
          placeholder={state.rating}
          type="number"
          name="rating"
          required
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div>
        <label>Imagen principal</label>

        <br />
        <img src={state.images} width="50" height="50" alt="no encontrada" />
        <input type="file" onChange={(ev) => base64Convert(ev)} required />
        <br />
      </div>

      <div>
        <label>Imagenes secundarias-max: 3</label>
        <br />

        {state.additionalphotos?.map((el, index) => (
          <div key={index}>
            <img src={el} width="50" height="50" alt="no encontrada" />

            <button onClick={() => takeOut(index)}>Quitar</button>
            <br />
          </div>
        ))}

        {state.additionalphotos?.length < 3 ? (
          <input type="file" onChange={(ev) => addNewPicture(ev)} required />
        ) : null}
      </div>

      <div>
        <label>Color</label>
        <input
          placeholder={state.color}
          type="text"
          name="color"
          required
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div>
        <label>Procesador</label>
        <input
          placeholder={state.processor}
          type="text"
          name="processor"
          required
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div>
        <label>Memoria RAM</label>
        <select onChange={(e) => handleRAM(e)}>
          <option disabled> select RAM </option>
          <option value="4Gb">4Gb</option>
          <option value="6Gb">6Gb</option>
          <option value="8Gb">8Gb</option>
          <option value="12Gb">12Gb</option>
        </select>
      </div>

      <div>
        <label>Memoria ROM</label>
        <select onChange={(e) => handleROM(e)}>
          <option disabled> select ROM </option>
          <option value="32Gb">32Gb</option>
          <option value="64Gb">64Gb</option>
          <option value="128Gb">128Gb</option>
          <option value="256Gb">256Gb</option>
        </select>
      </div>

      <div>
        <label>Red</label>
        <select onChange={(e) => handleNetwork(e)}>
          <option disabled> select Network </option>
          <option value="3G">3G</option>
          <option value="4G">4G</option>
          <option value="5G">5G</option>
        </select>
      </div>

      <div>
        <label>Batería(mAh)</label>
        <input
          placeholder={state.batery}
          type="number"
          name="batery"
          required
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div>
        <label>Cámara principal</label>
        <input
          placeholder={state.main_cam}
          type="number"
          name="main_cam"
          required
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div>
        <label>Camara frontal</label>
        <input
          placeholder={state.frontal_cam}
          type="number"
          name="frontal_cam"
          required
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div>
        <label>Pulgadas (for screen)</label>
        <input
          placeholder={state.inches}
          type="number"
          name="inches"
          required
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div>
        <label>Pantalla (type)</label>
        <input
          placeholder={state.screen}
          type="text"
          name="screen"
          required
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div>
        <label>Resolución</label>
        <input
          placeholder={state.resolution}
          type="text"
          name="resolution"
          required
          onChange={(e) => handleChange(e)}
        />
      </div>

      <button onClick={handleSubmit}>Guardar cambios</button>
    </div>
  );
}
