import React from "react";
import {  useSelector } from "react-redux";






const Carrito = () => {
    

    const myCart = useSelector(state => state.cartPhones)

    return(
        
        <div>
            <h1>Carrito</h1>
            {myCart.length?
             ( myCart.map(e=>{
                return(
                    <div>
                 <p>{e.brand}</p>
                <p>{e.model}</p>
                <p>{e.price}</p>
                <img src={e.images} alt={e.model}></img> 
                </div>
            )})

        //  (<div>
        //     <p>total: </p>
        //  </div> )  
        )
        : (
            <div>
            <h1>no hay articulos en tu carrito</h1>
          </div>
          )}
          </div>
)}


export default Carrito