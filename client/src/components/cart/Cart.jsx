import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './Cart.module.css'
import CartItem from '../cart/cartItem/CartItem'
import {adjustItemQty, getLocalCart, getUser} from '../../Actions/index'
import { Link, useHistory } from "react-router-dom";
import mercadopago from "../../images/mercadopago.png";
import { auth } from "../../firebase/firebase-config";
import SearchBar from "../SearchBar/Searchbar";
import NavBar from "../NavBar/NavBar";
import UserNavBar from "../UserNavBar/UserNavBar";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import BtnBack from "../back/BtnBack";
import ProductToEdit from "../Admin/ProductToEdit";

const Cart = () => {
  const modo = useSelector(state => state.modo)
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
    userVerificate();
  }, []);

  useEffect(() => {

    dispatch(getLocalCart())

  }, [])


  const userVerificate = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        let user = await axios.get(
          `http://localhost:3001/user/${currentUser.email}`
        );
        // if(user.data.banned){

        //   history.push("/banned")

        // }
        setTotalItems(items)
        setTotalPrice(price);
      }
    });
  };

  useEffect(() => {

    setTotalItems(items);
    setTotalPrice(price);
    
  }, [cart, totalPrice, totalItems]);

  const beginPaymentInStripe = async () => {

    let userInfo = await dispatch(getUser(auth.currentUser.email))

    await axios.post(`http://localhost:3001/userChangeQty/${userInfo.payload.email}`, {
      actualCartWithQty: cart,
      emailUser: userInfo.payload.email
    });

      //window.location.reload();

  }

  
  return (
    <>
    <div className={styles.fondo}>
      {user ? <UserNavBar /> : <NavBar />}
      <BtnBack className/>
    <div className="col-auto justify-content-center w-full md:w-1/2 px-3 mb-6 md:mb-0 border border-sky-500 center d-grid">
    <div className={styles.cart}>
      <div className={styles.cartItems}>
        {cart.map((item, i) => (
          <CartItem key={i} item={item} />
          ))}
      </div>
          </div>
          <br /><br />
      <div className="col-auto justify-content-center w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <div className={styles.cartSummary}>
        <h4 className={styles.summary__title}>Total:</h4>
        <div className={styles.summary__price}>
          {totalItems === 1 ? <span className={styles.span}>{totalItems} producto añadido</span> : <span className={styles.span}>{totalItems} productos añadidos</span>}
          <br/>
          <span>  $ {totalPrice}</span>
        </div>
        {totalItems ? <div>
      {auth.currentUser?.emailVerified ? 
      <div>
       <Link to="/stripe"><button className='btn btn-success mt-4' onClick={beginPaymentInStripe}>Comprar</button></Link>
        </div>
         : <span>Debes tener una cuenta y un mail verificado para comprar</span>}
        </div> : <span>Debes ingresar algun producto en el carrito para comprar</span>}
      </div>
      </div>
      <br /><br />
    </div>
    </div>
    </>
  );
};

export default Cart;
