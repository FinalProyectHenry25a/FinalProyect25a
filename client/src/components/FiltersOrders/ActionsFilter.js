import axios from 'axios';

export function filterOrder(send){
    return async function(dispatch){
   
     
        var json = await axios.get("http://localhost:3001/filtersAndOrders",send);
        console.log(send)
        return dispatch({
            type: 'FILTER_PHONES',
            payload: json.data
        })
    }
}