import axios from 'axios';

export function getPhones(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/home");
        console.log(json.data)
        return dispatch({
            type: 'GET_PHONES',
            payload: json.data
        })
    }
}
