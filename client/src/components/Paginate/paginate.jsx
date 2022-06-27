import React from "react";
import "./paginate.css";

export default function Paginado({ phonesPerPage, allPhones, paginado }) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allPhones / phonesPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav aria-label="...">
      <ul className="pagination justify-content-center">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className="page-item" key={number}>
              <button className="page-link" onClick={() => paginado(number)}>
                {number}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}
/*   <nav className="nav">
            <ul className="paginado">
                {pageNumbers &&
                pageNumbers.map(number => (
                    <li  className="li" key={number}>
                    <button onClick={() => paginado(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav> */
