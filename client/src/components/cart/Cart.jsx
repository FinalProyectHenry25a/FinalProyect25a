import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './Cart.module.css'
import CartItem from '../cart/cartItem/CartItem'
import { Link } from "react-router-dom";
import mercadopago from "../../images/mercadopago.png"
import SearchBar from "../SearchBar/Searchbar";
import UserNavBar from "../UserNavBar/UserNavBar";


const Cart = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const cart = useSelector(state => state.cart)

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
      <div className={styles.cart__summary}>
        <h4 className={styles.summary__title}>Total</h4>
        <div className={styles.summary__price}>
          <span>TOTAL: ({totalItems} productos)</span>
          <span>$ {totalPrice}</span>
        </div>
        <Link to="/mercadopago">
        <button className={styles.summary__checkoutBtn}>
        Confirmar Pedido <img src={mercadopago} />
        </button>
        </Link>
      </div>
    </div>
  )
}

export default Cart