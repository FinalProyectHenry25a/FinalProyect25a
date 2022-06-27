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

    export function addCart(payload){
        return{
            type:"CART",
            payload
        }
    }