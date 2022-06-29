import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";

export default function StockEdit(props) {
  const [user, setUser] = useState(auth.currentUser);
  const [postsState, setPostsState] = useState([]);
  const [change, setChange] = useState({do:'add', amount: 0});

  const history = useHistory();

  useEffect(async() => {
    userVerificate();
    const post = (await axios("http://localhost:3001/admin/posts")).data;
  
    loadPosts();
  }, [user, change]);

  async function loadPosts() {
    try {
        let post = (await axios("http://localhost:3001/admin/posts")).data;

        post = post.sort(function (a, b) {
          if (a.model.toLowerCase() > b.model.toLowerCase()) return 1;
          if (a.model.toLowerCase() < b.model.toLowerCase()) return -1;
          return 0;
        });

        setPostsState(post);
    } catch (error) {
      console.log(error);
    }
  }

  const userVerificate = async () => {
    await onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser || currentUser.email !== props.userRole) {
        history.push("/home");
      }
    });
  };


  function settings(e) {
    setChange({ 
        ...change,
        [e.target.name]: e.target.value
     });

    }
    
    async function editStock(id) {

      try {
        let stockInitial = postsState.find((el) => el.id === id).stock;
        let stockToChange = parseInt(document.getElementById(id).value);
        let actionToDo = document.getElementById("do").value;

        if (
          stockToChange === "NaN" || (actionToDo === "remove" && stockToChange > stockInitial) || stockToChange < 0
        ) {
          alert(
            "No se puede realizar la operacion debido. Revise stock actual  y valores unicamente positivos"
          );
        } else {
          let bod = { ...change, id: id };

          let add = (
            await axios.put("http://localhost:3001/admin/modifica-stock", bod)
          ).data;

          setChange({ ...change, amount: 0 });
          document.getElementById(id).value = null;
        }
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div>
      <Link to="/admin">
        <button>◀ Back</button>
      </Link>

      <br/><br/>

      {postsState?.map((el) => (
        <div key={el.id}>
          <h6> {el.brand} - {el.model} - {el.stock} unidades </h6>
          
          <select  id = 'do' name='do' onChange={settings}>
            <option value="add">Agregar stock</option>
            <option value="remove">Quitar stock</option>
          </select>

          <input id={el.id} name='amount' onChange={settings} />
          <label>unidades</label>


          <button onClick={() => editStock(el.id)}> editar </button>
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}
