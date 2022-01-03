
import { ALL_ORDERS_REQUEST,ALL_ORDERS_SUCCESS,ALL_ORDERS_FAIL,CLEAR_ERRORS, UPDATE_ORDERS_REQUEST, UPDATE_ORDERS_SUCCESS, UPDATE_ORDERS_FAIL, UPDATE_ORDERS_RESET, DELETE_ORDERS_REQUEST, DELETE_ORDERS_SUCCESS, DELETE_ORDERS_FAIL, DELETE_ORDERS_RESET } from "./constants";


export const allOrdersReducer=(state={orders:[]},action)=>{
    switch (action.type) {
        case ALL_ORDERS_REQUEST:
            return{
                loading:true,
                orders:[]

            }
        case ALL_ORDERS_SUCCESS:
            return{
                loading:false,
                orders:action.payload.data
            }
        case ALL_ORDERS_FAIL:
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
}

export const updateOrderReducer=(state={order:{}},action)=>{
    switch (action.type) {
        case UPDATE_ORDERS_REQUEST:
            return{
                ...state,
                loading:true
            }
        case UPDATE_ORDERS_SUCCESS:
            return{
                ...state,
                loading:false,
                isUpdated:action.payload

            }
        case UPDATE_ORDERS_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload.data

            }   
        case UPDATE_ORDERS_RESET:
            return{
                ...state,
                isUpdated:false
            } 
        default:
           return state;
    }
}

export const deleteOrderReducer=(state={order:{}},action)=>{
    switch (action.type) {
        case DELETE_ORDERS_REQUEST:
            return{
                ...state,
                loading:true
            }
        case DELETE_ORDERS_SUCCESS:
            return{
                ...state,
                loading:false,
                isDeleted:action.payload

            }
        case DELETE_ORDERS_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload.data

            }   
        case DELETE_ORDERS_RESET:
            return{
                ...state,
                isDeleted:false
            } 
        default:
           return state;
    }
}