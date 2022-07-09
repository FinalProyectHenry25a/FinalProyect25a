import { parseActionCodeURL } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from './Paginate.module.css'
import { paginateLang } from "./paginateLang";

export default function Paginado({ phonesPerPage, allPhones, paginado }) {
  const [currentPage, setCurrentPage] = useState(1);
  const lan = useSelector((state) => state.language);
  const pageNumbers = [];

  useEffect(() => {
    setCurrentPage(1);
  }, [allPhones]);

  for (let i = 0; i < Math.ceil(allPhones / phonesPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  function nextPage() {
    if (!(currentPage >= Math.ceil(allPhones / phonesPerPage))) {
      paginado(parseInt(currentPage) + 1);
      setCurrentPage(parseInt(currentPage) + 1);
    }
  }

  function previousPage() {
    if (currentPage - 1 > 0) {
      paginado(parseInt(currentPage) - 1);
      setCurrentPage(parseInt(currentPage) - 1);
    }
  }

  function onKeyDown(e) {
    if (e.keyCode == 13) {
      setCurrentPage(parseInt(e.target.value));
      if (
        parseInt(e.target.value) < 1 ||
        parseInt(e.target.value) > Math.ceil(allPhones / phonesPerPage) ||
        isNaN(parseInt(e.target.value))
      ) {
        setCurrentPage(1);
        paginado(1);
      } else {
        paginado(parseInt(e.target.value));
      }
    }
  }

  function onChange(e) {
    setCurrentPage(e.target.value);
  }

  function pag(number) {
    paginado(number);
    setCurrentPage(number);
  }

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
        <button className={styles.btn} onClick={() => previousPage()} disabled={currentPage === 1 || currentPage < 1}>
        {paginateLang[lan].anterior}
        </button>
        <input
          className={styles.input}
          onChange={(e) => onChange(e)}
          onKeyDown={(e) => onKeyDown(e)}
          name="page"
          autoComplete="off"
          value={currentPage}
        />
        <label className={styles.input}>
          / {Math.ceil(allPhones / phonesPerPage)}
        </label>
        <button className={styles.btn} onClick={() => nextPage()} disabled={currentPage === Math.ceil(allPhones / phonesPerPage) || currentPage > Math.ceil(allPhones / phonesPerPage) }>
        {paginateLang[lan].siguiente}
        </button>
      </ul>
    </nav>
  );
}
