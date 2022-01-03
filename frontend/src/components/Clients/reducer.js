import { ALL_CLIENTS_REQUEST,ALL_CLIENTS_SUCCESS,ALL_CLIENTS_FAIL, CLEAR_ERRORS,
    CREATE_CLIENT_REQUEST,CREATE_CLIENT_SUCCESS,CREATE_CLIENT_FAIL,CREATE_CLIENT_RESET,
    DELETE_CLIENT_REQUEST,DELETE_CLIENT_SUCCESS,DELETE_CLIENT_FAIL,DELETE_CLIENT_RESET, UPDATE_CLIENT_REQUEST, UPDATE_CLIENT_SUCCESS, UPDATE_CLIENT_FAIL, UPDATE_CLIENT_RESET, CLIENT_DETAIL_FAIL, CLIENT_DETAIL_SUCCESS, CLIENT_DETAIL_REQUEST
} from "./constants";


export const clientReducer=(state={clients:[]},action)=>{
    switch (action.type) {
        case ALL_CLIENTS_REQUEST:
            return{
                loading:true,
                clients:[]

            }
            
        case ALL_CLIENTS_SUCCESS:
            return{
                loading:false,
                clients:action.payload.data
            }
        case ALL_CLIENTS_FAIL:
            return{
               loading:false,
               error:action.payload 
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
        return state;
    }
};

export const clientDetailsReducer = (state = { client: {} }, action) => {
    switch (action.type) {
      case CLIENT_DETAIL_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case CLIENT_DETAIL_SUCCESS:
        return {
          loading: false,
          client: action.payload,
        };
      case CLIENT_DETAIL_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };

export const newclientReducer=(state={client:{}},action)=>{
    switch (action.type) {
        case CREATE_CLIENT_REQUEST:
            return{
                ...state,
                loading:true,

            }
            
        case CREATE_CLIENT_SUCCESS:
            return{
                loading:false,
                client:action.payload.data,
                success:action.payload.success

            }
        case CREATE_CLIENT_FAIL:
            return{
               loading:false,
               error:action.payload .data
            }
        case CREATE_CLIENT_RESET:
            return{
                loading:false,
                success:false
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
        return state;
    }
};

export const updateClientReducer=(state={client:{}},action)=>{
    switch (action.type) {
        case UPDATE_CLIENT_REQUEST:
            return{
                ...state,
                loading:true
            }
        case UPDATE_CLIENT_SUCCESS:
            return{
                ...state,
                loading:false,
                isUpdated:action.payload

            }
        case UPDATE_CLIENT_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload.data

            }   
        case UPDATE_CLIENT_RESET:
            return{
                ...state,
                isUpdated:false
            } 
        default:
           return state;
    }
}

export const deleteClientReducer=(state={client:{}},action)=>{
    switch (action.type) {
        case DELETE_CLIENT_REQUEST:
            return{
                ...state,
                loading:true
            }
        case DELETE_CLIENT_SUCCESS:
            return{
                ...state,
                loading:false,
                isDeleted:action.payload
            }
        case DELETE_CLIENT_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case DELETE_CLIENT_RESET:
            return{     
                ...state,
                isDeleted:false
            }
        default:
            return state;
    }
}