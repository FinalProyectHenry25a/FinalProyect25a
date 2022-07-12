import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './Cart.module.css'
import CartItem from '../cart/cartItem/CartItem'
import {getLocalCart} from '../../Actions/index'
import { Link, useHistory } from "react-router-dom";
import mercadopago from "../../images/mercadopago.png";
import { auth } from "../../firebase/firebase-config";
import SearchBar from "../SearchBar/Searchbar";
import NavBar from "../NavBar/NavBar";
import UserNavBar from "../UserNavBar/UserNavBar";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import BtnBack from "../back/BtnBack";

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();
  const [ user, setUser ] = useState();
  let items = 0;
  let price = 0;

  
  cart.forEach((item) => {
    items += item.qty;
    price += item.qty * item.price;
  });
  

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
        setTotalItems(items)
        setTotalPrice(price);
      }
    });
  };

  useEffect(() => {



    setTotalItems(items);
    setTotalPrice(price);
  }, [cart, totalPrice, totalItems]);

  
  return (
    <>
      {user ? <UserNavBar /> : <NavBar />}
      <BtnBack/>
    <div className={styles.cart}>
      <div className={styles.cartItems}>
        {cart.map((item, i) => (
          <CartItem key={i} item={item} />
        ))}
      </div>
      <div className={styles.cartSummary}>
        <h4 className={styles.summary__title}>Total:</h4>
        <div className={styles.summary__price}>
          {totalItems === 1 ? <span className={styles.span}>{totalItems} producto añadido</span> : <span className={styles.span}>{totalItems} productos añadidos</span>}
          <br/>
          <span>  $ {totalPrice}</span>
        </div>
        {totalItems ? <div>
      {auth.currentUser?.emailVerified ? <Link to="/mercadopago">
        <button  className={styles.summary__checkoutBtn}>
        Confirmar Pedido <br/><img src={mercadopago} />
        </button>
        </Link> : <span>Debes tener una cuenta y un mail verificado para comprar</span>}
        </div> : <span>Debes ingresar algun producto en el carrito para comprar</span>}
      </div>
    </div>
    </>
  );
};

export default Cart;
