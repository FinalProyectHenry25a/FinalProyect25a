import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, addToCart } from "../../Actions/index";
import { Link, useParams } from "react-router-dom";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);

  const PID = useSelector((state) => state.phonesId);

  return (
    <div
      style={{ background: "white", height: "max-content", overflow: "auto" }}
    >
      <nav aria-label="breadcrumb" style={{ margin: 10 + "px" }}>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/home" style={{ textDecoration: "none", color: "black" }}>
              Home
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {PID.brand}
          </li>
        </ol>
      </nav>
      <div
        style={{
          display: "inline-flex",
          justifyContent: "center",
          width: 20 + "%",
          height: 10 + "%",
          margin: 20 + "px",
        }}
      >
        <img
          src={PID.images}
          alt="Two each of gray, white, and black shirts laying flat."
          className="img-fluid"
        />
      </div>

      <div style={{ height: "max-content" }}>
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 style={{ margin: 25 + "px" }}>{PID.model}</h1>
        </div>

        <div
          style={{
            display: "inline-flex",
            flexFlow: "column wrap",
            position: "relative",
            right: 4 + "%",
            width: 85 + "%",
            justifyContent: "end",
            alignContent: "end",
          }}
        >
          <p className="fs-2 fw-bolder">${PID.price}</p>

          <div className="mt-6">
            <h3 className="sr-only">Rating</h3>
            <div className="flex items-center">
              <div className="flex items-center">
                {/* <svg className="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>


              <svg className="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>

      
              <svg className="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>


              <svg className="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg> */}

                {/* <svg className="text-gray-200 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg> */}
              </div>
              {/* <p className="sr-only">4 out of 5 stars</p> */}
              <div style={{fontSize: 26 + "px" }}>
                {PID.rating} 
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  margin="4"
                  fill="currentColor"
                  className="bi bi-star-half"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                </svg>
              </div>
              <br/>
            </div>
          </div>
          <form>
            <button type="submit" className="btn btn-outline-dark"  onClick={e => dispatch(addToCart(PID.id))}>
              Agregar al Carrito
            </button>
          </form>
        </div>

        <div
          style={{
            position: "relative",
            bottom: 200 + "px",
            margin: 25 + "px",
            width: 60 + "%",
          }}
        >
          {/* <div>
            <h3 className="sr-only">Descripcion</h3>
            <div>
              <p className="text-base text-gray-900">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                quaerat magni beatae praesentium odit. Ipsa rem incidunt officia
                at. Aperiam maiores aut voluptate velit numquam aliquam
                possimus. Corrupti, voluptatem veniam!
              </p>
            </div>
          </div>
 */}
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              Especificaciones
            </h3>

            <div className="mt-4">
              <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                <li className="text-gray-400">
                  <span className="text-gray-600">{PID.ram}</span>
                </li>

                <li className="text-gray-400">
                  <span className="text-gray-600">{PID.rom}</span>
                </li>

                <li className="text-gray-400">
                  <span className="text-gray-600">
                    Cuenta con un procesador {PID.processor}
                  </span>
                </li>

                <li className="text-gray-400">
                  <span className="text-gray-600">
                    Conectividad {PID.network}
                  </span>
                </li>
                <li className="text-gray-400">
                  <span className="text-gray-600">
                    Una bateria de {PID.batery} mAh
                  </span>
                </li>
                <li className="text-gray-400">
                  <span className="text-gray-600">
                    Una camara frontal de {PID.frontal_cam}" y una principal de{" "}
                    {PID.main_cam}"
                  </span>
                </li>
                <li className="text-gray-400">
                  <span className="text-gray-600">
                    Cuenta con una pantalla {PID.screen} de {PID.inches}" y una
                    resolucion de {PID.resolution}"
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/*  <div className="mt-10">
            <h2 className="text-sm font-medium text-gray-900">Details</h2>

            <div className="mt-4 space-y-6">
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                dolore nihil necessitatibus pariatur fuga itaque cumque maxime
                exercitationem beatae hic? Aperiam, hic quibusdam et at
                distinctio fugit qui officiis nam?
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
