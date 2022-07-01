import React, { useEffect, useState } from "react";
import "./paginate.css";

export default function Paginado({ phonesPerPage, allPhones, paginado }) {

  const [currentPage, setCurrentPage] = useState(1)
  const pageNumbers = [];

  useEffect(() =>{

    setCurrentPage(1)

  }, [allPhones])


  for (let i = 0; i < Math.ceil(allPhones / phonesPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  function nextPage() {
    if (!(currentPage >= Math.ceil(allPhones / phonesPerPage))) {
      paginado(currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  }

  function previousPage() {
    if (currentPage - 1 > 0) {
      paginado(currentPage - 1);
      setCurrentPage(currentPage - 1);
    }
  }


  function pag(number) {
    paginado(number);
    setCurrentPage(number);
  }

  return (
    <nav aria-label="...">
      <ul className="pagination justify-content-center">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className="page-item" key={number}>
              <button className="page-link" onClick={() => pag(number)}>
                {number}
              </button>
            </li>
          ))}
      </ul>

      <ul className="pagination justify-content-center">
        <button className="page-link" onClick={()=>previousPage()}>Anterior</button>
        {console.log(allPhones)}
        <label className="alert alert-light">{currentPage}/{Math.ceil(allPhones / phonesPerPage)}</label>
        <button className="page-link" onClick={()=>nextPage()}>Siguiente</button>
      </ul>        

    </nav>
  );
}

