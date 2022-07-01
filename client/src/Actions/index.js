import axios from 'axios';

export function getPhones(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/home");
        return dispatch({
            type: 'GET_PHONES',
            payload: json.data
        })
    }
}
export function getLocalCart(){
  return async function(dispatch){
      return dispatch({
          type: 'GET_LOCAL_CART'
      })
  }
}
export function getPhonesByModel(model){
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/home?model=${model}`);
        return dispatch({
            type: 'GET_PHONES_BY_NAME',
            payload: json.data
        })
    }
}
export function getDetails(id){
    return async function(dispatch){
        try{
            const json = await axios.get(`http://localhost:3001/home/`+id);
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        }catch (error){
            console.log(error)
        }
     }
    }

    export const filters = (setters) => (dispatch) => {

        
        return axios.post ('http://localhost:3001/filtersAndOrders', setters)
          .then((response) =>{
            dispatch({
              type: "FILTERS",
              payload: response.data,
            })}
          )
          .catch((error) => console.log(error));
      };

    export function postPhone(payload){
        return async function () {
            const json = await axios.post('http://localhost:3001/postCreator',payload);
            return json;
        }
    }



    export const addToCart = (itemID) => {
      return async function(dispatch){
        return dispatch({
        type: 'ADD_TO_CART',
        payload: {
          id: itemID,
        },
      })
      };
    };
    
    export const removeFromCart = (itemID) => {
      return async function(dispatch){
        return dispatch({
        type: 'REMOVE_FROM_CART',
        payload: {
          id: itemID,
        },
      })
      };
    };
    
    export const adjustItemQty = (itemID, qty) => {
      return async function(dispatch){
        return dispatch({
        type: 'ADJUST_ITEM_QTY',
        payload: {
          id: itemID,
          qty,
        },
      })
      };
    };
    
    export const loadCurrentItem = (item) => {
      return {
        type: 'LOAD_CURRENT_ITEM',
        payload: item,
      };
    };

    export function getAllUsers(){
      return async function(dispatch){
          var json = await axios.get("http://localhost:3001/user");
          return dispatch({
              type: 'GET_USERS',
              payload: json.data
          })
      }
  };

  export function becomeAdmin(email){
    return async function () {
        const json = await axios.put(`http://localhost:3001/admin/${email}`);
        return json;
    }
}

export function getUser(email){
  return async function(dispatch){
      var json = await axios.get(`http://localhost:3001/user/${email}`);
      return dispatch({
          type: 'GET_USER',
          payload: json.data
      })
  }
};



    