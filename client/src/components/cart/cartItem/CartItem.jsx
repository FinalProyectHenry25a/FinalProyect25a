import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adjustItemQty, removeFromCart, adjustQty, removeFromCartUser } from "../../../Actions/index";
import { auth } from "../../../firebase/firebase-config";
import styles from "./CartItem.module.css";

const CartItem = (props) => {
  const [input, setInput] = useState(props.item.qty);
  const adjustQty = (id, value) => {
    dispatch(adjustItemQty(id, value));
  };

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    adjustQty(props.item.id, e.target.value);
  };

  const dispatch = useDispatch();
  
  console.log(props)

  return (
    <div className={styles.cartItem}>
      <img src={props.item.images} alt={props.item.model} width={200} />
      <div className={styles.cartItemDetails}>
        <p className={styles.detailsTitle}>{props.item.brand}</p>
        <p className={styles.detailsTitle}>{props.item.model}</p>
        <p className={styles.detailsDesc}>{props.item.resolution}</p>
        <p className={styles.detailsDesc}>{props.item.rom}</p>
        <p className={styles.detailsPrice}>$ {props.item.price}</p>
      </div>
      <div className={styles.cartItemActions}>
        <div className={styles.cartItemQty}>
          <label htmlFor="qty">Cantidad</label>
          <input
            min="1"
            type="number"
            id="qty"
            name="qty"
            className={styles.input}
            value={""}
            onChange={onChangeHandler}
          />
        </div>
        {auth.currentUser ? (
          <button
            onClick={() =>
              dispatch(
                removeFromCartUser(auth.currentUser.email, props.item.id)
              )
            }
            className={styles.actions__deleteItemBtn}
          >
            x
          </button>
        ) : (
          <button
            onClick={() => dispatch(removeFromCart(props.item.id))}
            className={styles.actions__deleteItemBtn}
          >
            x
          </button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
