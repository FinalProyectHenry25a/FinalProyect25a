import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  adjustItemQty,
  removeFromCart,
  removeFromCartUser,
} from "../../../Actions/index";
import { auth } from "../../../firebase/firebase-config";
import styles from "./CartItem.module.css";


const CartItem = (props) => {

  const {item} = props;

  const dispatch = useDispatch();

  const [input, setInput] = useState(item.qty);
  const [stockView, setStockView] = useState(0);

  useEffect( () => {

    axiosPeticionById();

  }, []);

  const axiosPeticionById = async () => {

    let st = (await axios.get(`http://localhost:3001/home/${item.id}`));
    setStockView(st.data.stock);

  }

  const mas = () => {
    console.log('mas')
    setInput(input + 1);
  }

  const menos = () => {
    console.log('menos')
    setInput(input - 1);
    
  }
  const onChangeHandler = async (e) => {
  console.log('entre')
    setInput(e.target.value);
    dispatch(adjustItemQty(props.item.id, e.target.value));
    let post = (await axios.get(`http://localhost:3001/home/${props.item.id}`))
      .data;

    if (e.target.value > post.stock) {
      e.target.value = post.stock;
    }

  };
  return (
    <div className={styles.cartItem}>
      <img src={item.images} alt={item.model} width={200} className={styles.image}/>
      <div className={styles.cartItemDetails}>
        <p className={styles.detailsTitle}>{item.brand}</p>
        <p className={styles.detailsTitle}>{item.model}</p>
        <p className={styles.detailsDesc}>{item.resolution}</p>
        <p className={styles.detailsDesc}>{item.rom}</p>
        <p className={styles.detailsPrice}>$ {item.price}</p>
      </div>
      <div className={styles.cartItemActions}>
        <div className={styles.cartItemQty}>
          <label htmlFor="qty">Cantidad:</label>
          <input
            min="1"
            type="number"
            id="qty"
            name="qty"
            className={styles.input}
            value={input}
            onChange={onChangeHandler}
          />
          <div className={styles.count}>
            <button className={styles.countMas} onClick={mas}>+</button>
            <button className={styles.countMenos} onClick={menos}>-</button>
          </div>
          
        </div>
        <p className={styles.prf}> ({stockView} U.) </p>
        {auth.currentUser ? (
          <button
            onClick={() =>
              dispatch(
                removeFromCartUser(auth.currentUser.email, item.id)
              )
            }
            className={styles.actions__deleteItemBtn}
          >
           🗑️
          </button>
        ) : (
          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className={styles.actions__deleteItemBtn}
          >
            🗑️
          </button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
