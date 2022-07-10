import { parseActionCodeURL } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageOne, setPage } from "../../Actions";
import styles from './Paginate.module.css'
import { paginateLang } from "./paginateLang";

export default function Paginado({ phonesPerPage, allPhones, paginado }) {

  const lan = useSelector((state) => state.language);
  const pageNumbers = [];
  const dispatch = useDispatch();

  const page = useSelector((state) => state.currentPage);

  useEffect(() => {

    console.log(page);

  }, [allPhones]);

  for (let i = 0; i < Math.ceil(allPhones / phonesPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  function nextPage() {
    if (!(page >= Math.ceil(allPhones / phonesPerPage))) {
      paginado(parseInt(page) + 1);
      dispatch(setPage(parseInt(page) + 1));
    }
  }

  function previousPage() {
    if (page - 1 > 0) {
      paginado(parseInt(page) - 1);
      dispatch(setPage(parseInt(page) - 1));
    }
  }

  function onKeyDown(e) {
    if (e.keyCode == 13) {
      dispatch(setPage(parseInt(e.target.value)));
      if (
        parseInt(e.target.value) < 1 ||
        parseInt(e.target.value) > Math.ceil(allPhones / phonesPerPage) ||
        isNaN(parseInt(e.target.value))
      ) {
        dispatch(setPage(1));
        paginado(1);
      } else {
        paginado(parseInt(e.target.value));
      }
    }
  }

  // function onChange(e) {
  //   setCurrentPage(e.target.value);
  // }

  // function pag(number) {
  //   paginado(number);
  //   // setCurrentPage(number);
  // }

  return (
    <nav aria-label="...">
      {/* <ul className="pagination justify-content-center">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className="page-item" key={number}>
              <button className="page-link" onClick={() => pag(number)}>
                {number}
              </button>
            </li>
          ))}
      </ul> */}

      <ul className="pagination justify-content-center">
        <button className={styles.btn} onClick={() => previousPage()} disabled={page === 1 || page < 1}>
        {paginateLang[lan].anterior}
        </button>
        <input
          className={styles.input}
          onChange={(e) => dispatch(setPage(parseInt(e.nativeEvent.data)))}
          onKeyDown={(e) => onKeyDown(e)}
          name="page"
          autoComplete="off"
          value={page}
        />
        <label className={styles.input}>
          / {Math.ceil(allPhones / phonesPerPage)}
        </label>
        <button className={styles.btn} onClick={() => nextPage()} disabled={page === Math.ceil(allPhones / phonesPerPage) || page > Math.ceil(allPhones / phonesPerPage) }>
        {paginateLang[lan].siguiente}
        </button>
      </ul>
    </nav>
  );
}
