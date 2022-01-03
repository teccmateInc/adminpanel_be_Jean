import { LOGIN_SUCCESS,LOGIN_REQUEST,LOGIN_FAIL, CLEAR_ERRORS, LOGOUT_SUCCESS, LOGOUT_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL } from "./constants";
 export const LoginReducer=(state={user:{}},action)=>{
     switch (action.type) {
         case LOGIN_REQUEST:   
             return {
                loading:true,
                isAuthenticated:false,
                success:false
             };
             case LOGIN_SUCCESS:   
             return {
                 ...state,
                 loading:false,
                 isAuthenticated:true,
                 success:action.payload.success,
                 user:action.payload.data


             };
             case LOGOUT_SUCCESS:
                return{ 
                loading:false,
                 user:null,
                 success:false,
                 isAuthenticated:false,
                }

             case LOGIN_FAIL:   
             return {
                 ...state,
                loading:false,
                isAuthenticated:false,
                success:false,
                user:null,
                error:action.payload
             };

             case LOGOUT_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:action.payload
                }


             case CLEAR_ERRORS:
            return {
            ...state,
            error: null,
      };
         default:
             return state;
     }
 }

 export const profileReducer=(state={user:[]},action)=>{
    switch (action.type) {
            case USER_DETAILS_REQUEST:
                return{
                    loading:true,
                    success:false,
                    user:[]
                }
            case USER_DETAILS_SUCCESS:
                return{
                    loading:false,
                    sucess:action.payload.success,
                    user:action.payload.data
                }
            case USER_DETAILS_FAIL:
               return{
                    loading:false,
                    user:null,
                    success:false
               }
     
            case CLEAR_ERRORS:
                return {
                ...state,
                error: null,
          };

        default:
            return state;
    }
 }