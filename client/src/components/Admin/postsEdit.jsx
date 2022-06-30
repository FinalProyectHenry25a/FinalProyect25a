import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";
import { editPosts } from "../../Actions";
import axios from "axios";

export default function EditPosts(props) {
  const [user, setUser] = useState(auth.currentUser);
  const [postsState, setPostsState] = useState([]);
  const [change, setChange] = useState({ do: "add", amount: 0 });

  const history = useHistory();

  async function loadPosts() {
    try {
      const post = (await axios("http://localhost:3001/admin/posts")).data;
      setPostsState(post);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(async () => {
    userVerificate();
    await axios("http://localhost:3001/admin/posts").data;

    loadPosts();
  }, [user, change]);

  const userVerificate = async () => {
    await onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser || currentUser.email !== props.userRole) {
        history.push("/home");
      }
    });
  };

  async function editPost(id) {
    try {
      let stockInitial = postsState.find((el) => el.id === id);
      let stockToChange = parseInt(document.getElementById(id).value);
      let actionToDo = document.getElementById("do").value;

      if (
        stockToChange === "NaN" ||
        (actionToDo === "remove" && stockToChange > stockInitial) ||
        stockToChange < 0
      ) {
        alert(
          "No se puede realizar la operacion debido. Revise stock actual  y valores unicamente positivos"
        );
      } else {
        let bod = { ...change, id: id };

        let add = (
          await axios.put(`http://localhost:3001/admin/edit-post`, bod)
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

      <br />
      <br />

      {postsState?.map((el) => (
        <div key={el.id}>
          <h6>
            {el.brand} - {el.model}
          </h6>
          <button onClick={() => editPost(el.id)}> Borrar </button>
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}
