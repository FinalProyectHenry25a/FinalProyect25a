import React, { useState } from "react";
import { getPhonesByModel } from "../../Actions";
import style from "./../SearchBar/SearchBar.module.css";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [model, setModel] = useState("");

  function handleSearch(e) {
    setModel(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getPhonesByModel(model));
  }
  return (
    <form className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Busca tu proximo celular" aria-label="Search" onChange={(e) => handleSearch(e)}/>
      <button className="btn btn-outline-success" type="submit" onClick={(e) => handleSubmit(e)}> Search </button>
    </form>
  );
};
export default SearchBar;
