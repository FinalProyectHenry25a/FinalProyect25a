import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

//import axios from 'axios'

export default function Comprar({ productos, data }) {
  const [totalPrice, setTotalPrice] = useState(0);


  const cart = useSelector((state) => state.cart);
  
  useEffect(() => {
    const script = document.createElement("script");
    const attr_data_preference = document.createAttribute("data-preference-id");
    //const attr_nonce = document.createAttribute('nonce')

    // console.log(attr_data_preference)
    attr_data_preference.value = data.id;
    //attr_nonce.value = 'abcdefg'
    script.src =
      "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.setAttributeNode(attr_data_preference);
    // script.setAttributeNode(attr_nonce)

    document.getElementById("form1").appendChild(script);
    return () => {
      document.getElementById("form1").removeChild(script);
    };
  }, []);
  useEffect(() => {
    let price = 0;
    cart.forEach((item) => {
      price += item.qty * item.price;
    });
    setTotalPrice(price);
  }, [cart, totalPrice, setTotalPrice]);
  console.log(cart)

  return (
    <form id="form1">
      <h4>Listado de Compras</h4>
      <ul>
        {productos.map((producto, i) => {
          return (
            <>
              <li key={i}>
                {producto.brand} - {producto.price} - {producto.qty}
              </li>
            </>
          );
        })}{" "}
      </ul>
      <p>Total: {totalPrice}</p>
    </form>
  );
}
