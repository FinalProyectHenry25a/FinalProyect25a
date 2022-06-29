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
  }, [user]);

  async function loadPosts() {
    try {
      const post = (await axios("http://localhost:3001/admin/posts")).data;
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
    
    function editStock(id){
        
    console.log("seteo" , change);
    
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
          
          <select  name='do' onChange={settings}>
            <option value="add">Agregar stock</option>
            <option value="remove">Quitar stock</option>
          </select>

          <input name='amount' onChange={settings} />
          <label>unidades</label>


          <button onClick={() => editStock(el.id)}> editar </button>
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}
