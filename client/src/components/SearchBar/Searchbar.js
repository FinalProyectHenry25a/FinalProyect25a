import React, { useState } from "react";
import { getPhonesByModel } from "../../Actions";
import style from "./../SearchBar/SearchBar.module.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {BsSearch} from "react-icons/bs"

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
    <form className="d-inline-flex input-group w-50" style={{justifyContent: "center"  }} role="search">
      <input className="form-control text-truncate nav-item me-3 me-lg-1 active" style={{borderRadius: 10 + "px"}} type="search" placeholder="Busca tu proximo celular" aria-label="Search" onChange={(e) => handleSearch(e)}/>
      <button style={{borderRadius: 10 + "px", paddingInline: 20 + "px", border: "none", position: "relative", right: 9 + "%", background: "transparent"}} type="submit" onClick={(e) => handleSubmit(e)}><BsSearch style={{fontSize: 17 + "px", fontWeight: "larger"}}/></button>
    </form>
  );
};
export default SearchBar;
