import {ALL_ADMIN_REQUEST,ALL_ADMIN_SUCCESS,ALL_ADMIN_FAIL,CLEAR_ERRORS,
    CREATE_ADMIN_REQUEST,CREATE_ADMIN_SUCCESS,CREATE_ADMIN_FAIL,CREATE_ADMIN_RESET,
    UPDATE_ADMIN_REQUEST,UPDATE_ADMIN_SUCCESS,UPDATE_ADMIN_FAIL,UPDATE_ADMIN_RESET
    ,DELETE_ADMIN_REQUEST,DELETE_ADMIN_SUCCESS,DELETE_ADMIN_FAIL,DELETE_ADMIN_RESET, ADMIN_DETAIL_REQUEST, ADMIN_DETAIL_SUCCESS, ADMIN_DETAIL_FAIL,
} from "./constants"

export const adminReducer=(state={admins:[]},action)=>{
    switch (action.type) {
        case ALL_ADMIN_REQUEST:
            return{
                loading:true,
                admins:[]

            }
            
        case ALL_ADMIN_SUCCESS:
            return{
                loading:false,
                admins:action.payload.data
            }
        case ALL_ADMIN_FAIL:
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

export const adminDetailsReducer = (state = { admin: {} }, action) => {
    switch (action.type) {
      case ADMIN_DETAIL_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case ADMIN_DETAIL_SUCCESS:
        return {
          loading: false,
          admin: action.payload,
        };
      case ADMIN_DETAIL_FAIL:
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

//create Admin Reducer

export const createAdminReducer=(state={admin:{}},action)=>{
    switch (action.type) {
        case CREATE_ADMIN_REQUEST:
            return{
                ...state,
                loading:true,
            }
    
        case CREATE_ADMIN_SUCCESS:
            return{
                loading:false,
                admin:action.payload.data,
                success:action.payload.success
            }

        case CREATE_ADMIN_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case CREATE_ADMIN_RESET:
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
}

export const updateAdminReducer=(state={admin:{}},action)=>{
    switch (action.type) {
        case UPDATE_ADMIN_REQUEST:
            return{
                ...state,
                loading:true
            }
        case UPDATE_ADMIN_SUCCESS:
            return{
                ...state,
                loading:false,
                isUpdated:action.payload.success

            }
        case UPDATE_ADMIN_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload

            }   
        case UPDATE_ADMIN_RESET:
            return{
                ...state,
                isUpdated:false
            } 
        default:
           return state;
    }
}

export const deleteAdminReducer=(state={admin:{}},action)=>{
    switch (action.type) {
        case DELETE_ADMIN_REQUEST:
            return{
                ...state,
                loading:true
            }
        case DELETE_ADMIN_SUCCESS:
            return{
                ...state,
                loading:false,
                isDeleted:action.payload

            }
        case DELETE_ADMIN_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload.data

            }   
        case DELETE_ADMIN_RESET:
            return{
                ...state,
                isDeleted:false
            } 
        default:
           return state;
    }
}