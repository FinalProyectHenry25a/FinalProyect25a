const initialState = {
    phones : [],
    
}

function rootReducer (state = initialState, action){
    switch(action.type){ 
        case 'GET_PHONES':
            return{
                ...state,
                phones: action.payload,
            }
        case 'GET_PHONES_BY_NAME':
            return{
                ...state,
                phones: action.payload
            }
            default:
                return state;
        }      
    }

export default rootReducer ;