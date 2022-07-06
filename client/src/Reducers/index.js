const initialState = {
    phones : [],
    phonesId : [],
    cart: [],
    currentItem: null,
    filtered:[],
    users: [],
    user: {},
    count: 1,
    questions:[]
}

function rootReducer (state = initialState, action){
    switch(action.type){ 
        case 'GET_PHONES':
            return{
                ...state,
                phones: action.payload
            }
        case 'GET_USERS':
          let usersWithouthSuperAdmin = action.payload.filter(element => element.email !== "finalproyect25a@gmail.com");
              return{
                ...state,
                users: usersWithouthSuperAdmin
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
            var currentCart = JSON.parse(localStorage.getItem("cart")) || []
            
            return { ...state, cart: currentCart }
        case 'GET_DETAILS':
            return{
                ...state,
                phonesId: action.payload
            }
            case "GET_LOCAL_FILTERS":
              let currentFilter = JSON.parse(localStorage.getItem("filter")) || []
              return{
                ...state,
                phones:currentFilter,
                filtered:currentFilter
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

              case "ADD_TO_CART_USER":

                const itemUser = state.phones.find(
                  (product) => product.id === action.payload.id
                );
                // Check if Item is in cart already
                const inCartUser = state.cart.find((item) =>
                  item.id === action.payload.id ? true : false
                );
          

                
                const newCartUser = inCartUser
                ? state.cart.map((item) =>
                    item.id === action.payload.id
                      ? { ...itemUser, qty: item.qty + 1 }
                      : item
                  )
                : [...state.cart, { ...itemUser, qty: 1 }]
                  
                localStorage.setItem("cart", JSON.stringify(newCartUser))

                return {
                  ...state,
                  cart: newCartUser
                };

                case "REMOVE_FROM_CART_USER":

                  let removeCartUser = state.cart.filter((item) => item.id !== action.payload.id)
  
                  localStorage.setItem("cart", JSON.stringify(removeCartUser));
                   
                  return {
                    ...state,
                    cart: removeCartUser
                  };

              case 'REMOVE_FROM_CART':

                let removeCart = state.cart.filter((item) => item.id !== action.payload.id)
  
                localStorage.setItem("cart", JSON.stringify(removeCart));
                 
                return {
                  ...state,
                  cart: removeCart
                };

                case "CLEAR_CART_POST_BUY":

                localStorage.clear()

                return {
                  ...state,
                  cart: []
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
                case "GET_QUESTIONS":
                  return {
                    ...state,
                    questions: action.payload,
                  }; 
            default:
                return state;
        }      
    }

export default rootReducer ;
