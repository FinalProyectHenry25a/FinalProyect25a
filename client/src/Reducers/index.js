const initialState = {
    phones : [],
    phonesId : []
}

function rootReducer (state = initialState, action){
    switch(action.type){ 
        case 'GET_PHONES':
            return{
                ...state,
                phones: action.payload,
            }
            case 'GET_DETAILS':
            return{
                ...state,
                phonesId: action.payload
            }
            default:
                return state;
        }      
    }

export default rootReducer ;