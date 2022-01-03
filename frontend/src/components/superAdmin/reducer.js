import {ALL_SUPERADMIN_REQUEST,ALL_SUPERADMIN_SUCCESS,ALL_SUPERADMIN_FAIL,CLEAR_ERRORS} from "./constants"

export const superAdminReducer=(state={superadmin:[]},action)=>{
    switch (action.type) {
        case ALL_SUPERADMIN_REQUEST:
        return{
                loading:true,
                superadmin:[]

            }
            
        case ALL_SUPERADMIN_SUCCESS:
            return{
                loading:false,
                superadmin:action.payload.data
            }
        case ALL_SUPERADMIN_FAIL:
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


