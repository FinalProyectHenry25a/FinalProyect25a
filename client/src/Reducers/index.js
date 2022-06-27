const initialState = {
    phones : [],
    phonesId : [],
    cartPhones:[],
}

function rootReducer (state = initialState, action){
    switch(action.type){ 
        case 'GET_PHONES':
            return{
                ...state,
                phones: action.payload
            }
        case 'GET_PHONES_BY_NAME':
            return{
                ...state,
                phones: action.payload
            }
        case 'GET_DETAILS':
            return{
                ...state,
                phonesId: action.payload
            }
            
               case 'FILTERS':
            return{
                ...state,
                phones: action.payload
            }
            case 'CART':
                return{
                    ...state,
                    cartPhones:action.payload
                }
                
            default:
                return state;
        }      
    }

export default rootReducer ;