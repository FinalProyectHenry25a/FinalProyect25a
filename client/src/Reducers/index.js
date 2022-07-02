const initialState = {
    phones : [],
    phonesId : [],
    cart: [],
    currentItem: null,
    filtered:[],
    users: [],
    user: {}
}

function rootReducer (state = initialState, action){
    switch(action.type){ 
        case 'GET_PHONES':
            return{
                ...state,
                phones: action.payload
            }
        case 'GET_USERS':
              return{
                ...state,
                users: action.payload
            }
        case 'GET_USER':
              return{
                ...state,
                user: action.payload
            }
        case 'GET_PHONES_BY_NAME':
            return{
                ...state,
                phones: action.payload
            }
        case 'GET_LOCAL_CART':
            const currentCart = JSON.parse(localStorage.getItem("cart")) || []
            
            return { ...state, cart: currentCart }
        case 'GET_DETAILS':
            return{
                ...state,
                phonesId: action.payload
            }
            
               case 'FILTERS':
            return{
                ...state,
                phones: action.payload,
                filtered:action.payload
            }
            case 'ADD_TO_CART':
                // Great Item data from products array
                const item = state.phones.find(
                  (product) => product.id === action.payload.id
                );
                // Check if Item is in cart already
                const inCart = state.cart.find((item) =>
                  item.id === action.payload.id ? true : false
                );
          

                
                const newCart = inCart
                ? state.cart.map((item) =>
                    item.id === action.payload.id
                      ? { ...item, qty: item.qty + 1 }
                      : item
                  )
                : [...state.cart, { ...item, qty: 1 }]

                localStorage.setItem("cart", JSON.stringify(newCart))

                return {
                  ...state,
                  cart: newCart
                };
              case 'REMOVE_FROM_CART':
                localStorage.clear();
                return {
                  ...state,
                  cart: state.cart.filter((item) => item.id !== action.payload.id),
                };
              case 'ADJUST_ITEM_QTY':
                return {
                  ...state,
                  cart: state.cart.map((item) =>
                    item.id === action.payload.id
                      ? { ...item, qty: +action.payload.qty }
                      : item
                  ),
                };
              case 'LOAD_CURRENT_ITEM':
                return {
                  ...state,
                  currentItem: action.payload,
                };
              case 'ADMIN_POSTS':
                return {
                  ...state,
                  phones: action.payload
                }
              case "EDIT_POSTS": 
                return {
                  ...state,
                  phones: action.payload,
                  phonesId: action.payload 
                }
              case "USERS_ADMIN":
                return {
                  ...state,
                  users: action.payload,
                };    
            default:
                return state;
        }      
    }

export default rootReducer ;
