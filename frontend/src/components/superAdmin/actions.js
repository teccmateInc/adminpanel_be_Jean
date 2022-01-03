import {ALL_SUPERADMIN_REQUEST,ALL_SUPERADMIN_SUCCESS,ALL_SUPERADMIN_FAIL,CLEAR_ERRORS} from "./constants"
import axios from "axios";

export const getSuperAdmin=()=>async(dispatch)=>{
    try {
        dispatch({type:ALL_SUPERADMIN_REQUEST});

        const {data}=await axios.get("/api/superadmin")
        dispatch({
            type:ALL_SUPERADMIN_SUCCESS,
            payload:data,
        })
    } catch (error) {
        dispatch({
            type:ALL_SUPERADMIN_FAIL,
            payload:error.response.data.message
        })
    }
}

//clearing errors
export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}