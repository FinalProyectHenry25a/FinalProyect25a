import swal from 'sweetalert';

const initialState = {
    phones : [],
    phonesId : [],
    cart: [],
    currentItem: null,
    filtered:{ byRom: null,
      byRam: null,
      byBrand: null,
      byPrice: null,
      byNetwork: null,
      byProcessor: null,
      byOrder: null,},
    favs: [],  
    users: [],
    user: {},
    count: 1,
    questions:[],
    language: JSON.parse(localStorage.getItem("l"))? JSON.parse(localStorage.getItem("l")) : 'es'
}

function rootReducer (state = initialState, action){
    switch(action.type){ 
        case 'GET_PHONES':
          return{
            ...state,
            phones: action.payload
          }
        case "CLEAN_UP":
          return{
            ...state,
            phonesId: action.payload
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
            //phones:currentFilter,
            filtered:currentFilter
          }
        case 'FILTERS':
          return{
            ...state,
            phones: action.payload,
            filtered:action.maxifiltros
          }
        case 'ADD_TO_CART':
          // Great Item data from products array
          const item = state.phones.find(
            (product) => product.id === action.payload.id);
            // Check if Item is in cart already
            const inCart = state.cart.find((item) =>
            item.id === action.payload.id ? true : false
            );
            
          const newCart = inCart
            ? state.cart.map((item) => item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item
            )
            : [...state.cart, { ...item, qty: 1 }]
              
            localStorage.setItem("cart", JSON.stringify(newCart))
            swal('Agregaste correctamente el producto al carrito')
          return {
            ...state,
            cart: newCart
          };
        case "ADD_TO_CART_USER":
          const itemUser = state.phones.find(
            (product) => product.id === action.payload.id);
                // Check if Item is in cart already
          const inCartUser = state.cart.find((item) =>
          item.id === action.payload.id ? true : false);
          
          const newCartUser = inCartUser
            ? state.cart.map((item) => item.id === action.payload.id
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
          let newQtyCart =  state.cart.map((item) => item.id === action.payload.id
            ? { ...item, qty: + action.payload.qty }
            : item
          )
          localStorage.setItem("cart", JSON.stringify(newQtyCart))
          return {
            ...state,
            cart: newQtyCart
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
        case "LANGUAGE" :
          localStorage.setItem('l', JSON.stringify(action.payload));
          return {
            ...state,
            language: action.payload
          }
        case 'GET_LOCAL_FAVS':
          var currentFavs = JSON.parse(localStorage.getItem("favs")) || []
          return {
            ...state,
            favs: currentFavs
          }
        case "REMOVE_FAVS": 
          let removePhoneFromLocalStorage = state.favs.filter((e) => e !== action.payload.id)
          localStorage.setItem("favs", JSON.stringify(removePhoneFromLocalStorage));         
          return {
            ...state,
            favs: removePhoneFromLocalStorage
          }
        case "ADD_FAVS":
          console.log(action.payload)
          const fav = state.phones.find((product) => product.id === action.payload.id);
                  
          const inFavs = state.favs.find((item) =>
            item === action.payload.id ? true : false
          );

          const newFav = inFavs 
            ? state.favs.find((e) => e !== action.payload.id)
              ? [fav.id]
              : null
            : [...state.favs, fav.id]
                  
          localStorage.setItem("favs", JSON.stringify(newFav))
          return {
            ...state,
            favs: newFav
          }
        default:
          return state;
    }      
}

export default rootReducer ;
