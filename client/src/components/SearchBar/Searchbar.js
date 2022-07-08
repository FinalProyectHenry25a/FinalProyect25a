import React, { useState } from "react";
import { getPhonesByModel } from "../../Actions";
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
    <form className={style.container}>
      <input className={style.input} onChange={(e) => handleSearch(e)}/>
      <button className={style.btn} type="submit" onClick={(e) => handleSubmit(e)}>{searchBarLang [lan].buscar}</button>
    </form>
  );
};
export default SearchBar;
