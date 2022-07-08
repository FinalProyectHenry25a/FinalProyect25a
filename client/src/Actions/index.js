import axios from "axios";

export function getPhones() {
  return async function (dispatch) {
    var json = await axios.get("https://back25ademo.herokuapp.com/home");
    return dispatch({
      type: "GET_PHONES",
      payload: json.data,
    });
  };
}
export function getLocalCart() {
  return async function (dispatch) {
    return dispatch({
      type: "GET_LOCAL_CART",
    });
  };
}
export function getPhonesByModel(model) {
  return async function (dispatch) {
    var json = await axios.get(`https://back25ademo.herokuapp.com/home?model=${model}`);
    return dispatch({
      type: "GET_PHONES_BY_NAME",
      payload: json.data,
    });
  };
}
export function getDetails(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`https://back25ademo.herokuapp.com/home/` + id);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const filters = (setters) => (dispatch) => {
  
  return axios
    .post("https://back25ademo.herokuapp.com/filtersAndOrders", setters)
    .then((response)=>{localStorage.setItem("filter",JSON.stringify(setters)) 
  return response})
    .then((response) => {
      dispatch({
        type: "FILTERS",
        payload: response.data,
        maxifiltros: setters,
      });
    })
    
    .catch((error) => console.log(error));
};
export function getLocalFilter() {
  return async function (dispatch) {
    return dispatch({
      type: "GET_LOCAL_FILTERS",
    });
  };
}

export function postPhone(payload) {
  return async function () {
    const json = await axios.post("https://back25ademo.herokuapp.com/admin/post", payload);
    return json;
  };
}

export const addToCart = (itemID) => {
  return async function (dispatch) {
    return dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: itemID,
      },
    });
  };
};

export const addToCartUser = (email, itemID) => {
  return async function (dispatch) {
    let json = await axios.put((`https://back25ademo.herokuapp.com/cart/${email}/${itemID}`))
    return dispatch({
      type: "ADD_TO_CART_USER",
      payload: {
        id: itemID,
      },
    });
  }
};

export const removeFromCart = (itemID) => {
  return async function (dispatch) {
    return dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        id: itemID,
      },
    });
  };
};
 

export const clearCart = (email) => {
  return async function (dispatch) {
    await axios.put(`https://back25ademo.herokuapp.com/user//emptyCart/${email}`)
    return dispatch({
      type: "CLEAR_CART_POST_BUY",
      payload: [],
    });
  };
};

export const banUser = (email) => {
  return async function (dispatch) {
    await axios.put(`https://back25ademo.herokuapp.com/banned/${email}`)
    window.location.reload()
    return dispatch({
      type: "BAN_USER",
      payload: []
    });
  };
};

export const unbanUser = (email) => {
  return async function (dispatch) {
    await axios.put(`https://back25ademo.herokuapp.com/banned/unban/${email}`)
    window.location.reload()
    return dispatch({
      type: "UNBAN_USER",
      payload: []
    });
  };
};

// export const emptyCart = (email) => {
//   return async function (dispatch) {
//     await axios.put(`https://back25ademo.herokuapp.com/user//emptyCart/${email}`)
//     return dispatch({
//       type: "EMPTY_CART",
//       payload: []
//     });
//   };
// };


export const removeFromCartUser = (email, itemID) => {
  return async function (dispatch) {
    await axios.put((`https://back25ademo.herokuapp.com/cart/delete/${email}/${itemID}`))
    return dispatch({
      type: "REMOVE_FROM_CART_USER",
      payload: {
        id: itemID,
      },
    });
  };
};

export const adjustItemQty = (itemID, qty) => {
  return async function (dispatch) {
    return dispatch({
      type: "ADJUST_ITEM_QTY",
      payload: {
        id: itemID,
        qty,
      },
    });
  };
};

export function postAdmin() {
  return async function (dispatch) {
    var json = await axios.get("https://back25ademo.herokuapp.com/admin/posts");
    return dispatch({
      type: "ADMIN_POSTS",
      payload: json.data,
    });
  };
}

export function editPost(id, payload) {
  return async function (dispatch) {
    console.log(id);
    console.log(payload);
    var json = await axios.put(
      `https://back25ademo.herokuapp.com/admin/posts/${id}`,
      payload
    );

    return dispatch({
      type: "EDIT_POST",
      payload: json.data,
    });
  };
}

export const loadCurrentItem = (item) => {
  return {
    type: "LOAD_CURRENT_ITEM",
    payload: item,
  };
};

export function getAllUsers() {
  return async function (dispatch) {
    var json = await axios.get("https://back25ademo.herokuapp.com/user");
    return dispatch({
      type: "GET_USERS",
      payload: json.data,
    });
  };
}

export function becomeAdmin(email) {
  return async function () {
    const json = await axios.put(`https://back25ademo.herokuapp.com/admin/${email}`);
    window.location.reload();
    return json;
  };
}

export function removeAdmin(email) {
  return async function () {
    const json = await axios.put(`https://back25ademo.herokuapp.com/admin/removeAdmin/${email}`);
    window.location.reload();
    return json;
  };
}

export function getUser(email) {
  return async function (dispatch) {
    var json = await axios.get(`https://back25ademo.herokuapp.com/user/${email}`);
    return dispatch({
      type: "GET_USER",
      payload: json.data,
    });
  };
}

export function usersAdmin() {
  return async function (dispatch) {
    var json = await axios.get(`https://back25ademo.herokuapp.com/admin/users`);
    return dispatch({
      type: "USERS_ADMIN",
      payload: json.data,
    });
  };
}

export function getQuestions() {
  return async function (dispatch) {
    var json = await axios.get("https://back25ademo.herokuapp.com/pregunta");
    return dispatch({
      type: "GET_QUESTIONS",
      payload: json.data,
    });
  };
}

export const language = (leng) => {
  return {
    type: "LANGUAGE",
    payload: leng,
  };
};

