import React, { useState } from "react";
import { getPhonesByModel } from "../../Actions";
import style from "./../SearchBar/SearchBar.module.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const SearchBar = ({setCurrentPage}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [model, setModel] = useState("");

  function handleSearch(e) {
    setModel(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    history.push("/home")
    dispatch(getPhonesByModel(model));
    setCurrentPage(1)
  }
  return (
    <form className="d-flex" role="search">
      <input className="form-control me-3 text-truncate" type="search" placeholder="Busca tu proximo celular" aria-label="Search" onChange={(e) => handleSearch(e)}/>
      <button className="btn btn-outline-dark" type="submit" onClick={(e) => handleSubmit(e)}> Search </button>
    </form>
  );
};
export default SearchBar;
