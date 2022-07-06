import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './Cart.module.css'
import CartItem from '../cart/cartItem/CartItem'
import {getLocalCart} from '../../Actions/index'
import { Link, useHistory } from "react-router-dom";
import mercadopago from "../../images/mercadopago.png";
import { auth } from "../../firebase/firebase-config";
import SearchBar from "../SearchBar/Searchbar";
import UserNavBar from "../UserNavBar/UserNavBar";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";


const Cart = () => {

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const history = useHistory()
  

  useEffect(() => {
    verificarQueHayaUsuarioLogueado();
  }, []);

  useEffect(() => {

    dispatch(getLocalCart())

  }, [])


  const verificarQueHayaUsuarioLogueado = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        let user = await axios.get(
          `http://localhost:3001/user/${currentUser.email}`
        );
        if(user.data.banned){

          history.push("/banned")

        }
      }
    });
  };

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
  
  console.log(auth.currentUser);
  
  return (
    <>
      <UserNavBar/>
    <div className={styles.cart}>
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
        <button  className={styles.summary__checkoutBtn}>
        Confirmar Pedido <img src={mercadopago} />
        </button>
        </Link> : <span>Debes tener una cuenta y un mail verificado para comprar</span>}
      </div>
    </div>
    </>
  )
}

export default Cart