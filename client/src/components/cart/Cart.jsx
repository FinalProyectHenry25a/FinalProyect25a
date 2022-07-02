import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './Cart.module.css'
import { onAuthStateChanged, signOut } from "firebase/auth";

import CartItem from '../cart/cartItem/CartItem'
import {getLocalCart, getMercadoPago} from '../../Actions/index'
import { Link } from "react-router-dom";
import mercadopago from "../../images/mercadopago.png";
import { auth } from "../../firebase/firebase-config";
import SearchBar from "../SearchBar/Searchbar";
import UserNavBar from "../UserNavBar/UserNavBar";
import axios from "axios";


const Cart = () => {

  const [totalPrice, setTotalPrice] = useState(0);
  const [loggedUser, setLoggedUser] = useState();
 
  const [totalItems, setTotalItems] = useState(0);
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  useEffect(() => {
    verificarQueHayaUsuarioLogueado();
  }, []);
  useEffect(() => {
    console.log("Entrando al effect")
    dispatch(getLocalCart())
  }, [])
  const verificarQueHayaUsuarioLogueado = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        let user = await axios.get(
          `http://localhost:3001/user/${currentUser.email}`
        );
        if(currentUser.emailVerified){

          await axios.put(`http://localhost:3001/verification/${currentUser.email}`)

        }
        setLoggedUser(user.data);
      }
    });
  };
  const productsMercado = cart.map((element) => {
    return {
        brand: element.brand,
        model: element.model,
        unit_price: element.price,
        quantity: element.qty,
    };
});
  const pay = () => {
  dispatch(getMercadoPago({email: loggedUser, items: productsMercado}));
  // navigate('/mercadopago')
  }

  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach((item) => {
      items += item.qty;
      price += item.qty * item.price;
    });

    setTotalItems(items);
    setTotalPrice(price);
    
  }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);
  
  
  return (
    <div className={styles.cart}>
      <UserNavBar/>
      <div className={styles.cartItems}>
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className={styles.cartSummary}>
        <h4 className={styles.summary__title}>Total</h4>
        <div className={styles.summary__price}>
          <span>TOTAL: ({totalItems} productos)</span>
          <span>$ {totalPrice}</span>
        </div>
   {auth.currentUser?.emailVerified ? <Link to="/mercadopago"> 
        <button className={styles.summary__checkoutBtn} onClick={() => pay()}>
        Confirmar Pedido <img src={mercadopago} />
        </button>
        </Link> : <span>Debes tener una cuenta con mail verificado para comprar</span>}
      </div>
    </div>
  )
}

export default Cart