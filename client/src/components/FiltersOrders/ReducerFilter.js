const initialState = {
    phones : [],
    allPhones:[],
}

function rootReducer (state = initialState, action){
    switch(action.type){ 
        case 'FILTER_PHONES':
            return{
                ...state,
                phones: action.payload,

            }
            default:
                return state;
    }
}