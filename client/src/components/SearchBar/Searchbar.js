import React, { useState } from "react";
import { getPhonesByModel, pageOne } from "../../Actions";
import style from "./../SearchBar/SearchBar.module.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { searchBarLang } from "./searchBarLang";

const SearchBar = ({setCurrentPage}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [model, setModel] = useState("");
  const lan = useSelector ((state) => state.language);
  const page = useSelector((state) => state.currentPage);

  function handleSearch(e) {
    setModel(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    history.push("/home")
    dispatch(getPhonesByModel(model));
    dispatch(pageOne())
  }
  return (
    <form className="d-flex" style={{width: "90%"}}>
      <input className="form-control me-2" onChange={(e) => handleSearch(e)}/>
      <button className="btn btn-outline-dark" type="submit" onClick={(e) => handleSubmit(e)}>{searchBarLang [lan].buscar}</button>
    </form>
  );
};
export default SearchBar;
