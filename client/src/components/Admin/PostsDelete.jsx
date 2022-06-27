import React from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

export default function PostsDelete() {
  return (
    <div>
      <Link to="/admin">
        <button>◀ Back</button>
      </Link>
      <h1>borro publicaciones</h1>
    </div>
  );
}
