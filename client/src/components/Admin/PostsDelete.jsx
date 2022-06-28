import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios, { Axios } from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import { auth } from "../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export default function PostsDelete(props) {
  const [postsState, setPostsState] = useState([]);
  const [user, setUser] = useState(auth.currentUser);
  const history = useHistory();

  useEffect(async () => {
    userVerificate();
    const post = (await axios("http://localhost:3001/admin/posts")).data;
    loadPosts();
  }, [user]);

  const userVerificate = async () => {
    await onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser || currentUser.email !== props.userRole) {
        history.push("/home");
      }
    });
  };

  async function loadPosts() {
    try {
      const post = (await axios("http://localhost:3001/admin/posts")).data;
      setPostsState(post);
    } catch (error) {
      console.log(error);
    }
  }

  async function deletePost(id) {
    try {
      const del = await axios.delete(`http://localhost:3001/admin/post/${id}`);
      await loadPosts();
      alert("Publicación borrada");
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
          <button onClick={() => deletePost(el.id)}> Borrar </button>
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}
