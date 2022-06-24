const initialState = {
    phones : [],
    phonesId : [],
    allPhones:[],
    filtrados:[],
  
}

function rootReducer (state = initialState, action){
    switch(action.type){ 
        case 'GET_PHONES':
            return{
                ...state,
                phones: action.payload,
                allPhones: action.payload
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
            case 'FILTER_BY_BRAND':
                const allPhones = state.allPhones
                const filterByBrand = action.payload === "all"? allPhones: allPhones.filter(e=>e.brand.includes(action.payload))
                return{
                    ...state,
                    phones: filterByBrand,
                  
               }
               case 'FILTER_BY_RAM':
                const allPhone = state.allPhones
                const filterByRam =  action.payload === "all"? allPhone: allPhone.filter(e=>e.ram.includes(action.payload))
                return{
                    ...state,
                    phones: filterByRam,
                    
               }
            default:
                return state;
        }      
    }

export default rootReducer ;