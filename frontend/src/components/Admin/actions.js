import {ALL_ADMIN_REQUEST,ALL_ADMIN_SUCCESS,ALL_ADMIN_FAIL,CLEAR_ERRORS,
    CREATE_ADMIN_REQUEST,CREATE_ADMIN_SUCCESS,CREATE_ADMIN_FAIL,
     DELETE_ADMIN_REQUEST, DELETE_ADMIN_SUCCESS, DELETE_ADMIN_FAIL, UPDATE_ADMIN_REQUEST, UPDATE_ADMIN_SUCCESS, UPDATE_ADMIN_FAIL, ADMIN_DETAIL_SUCCESS, ADMIN_DETAIL_REQUEST, ADMIN_DETAIL_FAIL
} from "./constants"
import axios from "axios";

//action to get all the clients
export const getAllAdmins=()=>async(dispatch)=>{
    try {
        dispatch({type:ALL_ADMIN_REQUEST});

        const {data}=await axios.get("/api/admin")
        dispatch({
            type:ALL_ADMIN_SUCCESS,
            payload:data,
        })
    } catch (error) {
        dispatch({
            type:ALL_ADMIN_FAIL,
            payload:error.response.data.message
        })
    }
}

export const getAdminDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: ADMIN_DETAIL_REQUEST });
  
      const { data } = await axios.get(`/api/admin/${id}`);
  
      dispatch({
        type: ADMIN_DETAIL_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_DETAIL_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//action to create new Admin
export const createAdmin=(adminData)=>async(dispatch)=>{
    try {
        dispatch({type:CREATE_ADMIN_REQUEST});
        const config = {
            headers: { "Content-Type": "application/json" },
          };
        const {data}=await axios.post("/api/admin",adminData,config)
        dispatch({
            type:CREATE_ADMIN_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:CREATE_ADMIN_FAIL,
            payload:error.response.data.message
        })
    }
}

export const updateAdmin=(id,adminData)=>async(dispatch)=>{
    try {
        dispatch({type:UPDATE_ADMIN_REQUEST})
        const config = {
            headers: { "Content-Type": "application/json" },
          };
        const {data}=await axios.put(`/api/admin/${id}`,adminData,config);
        console.log(data)
        dispatch({
            type:UPDATE_ADMIN_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:UPDATE_ADMIN_FAIL,
            payload:error.response.data.message
        })        
    }
}

export const deleteAdmin=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:DELETE_ADMIN_REQUEST
        })
        const {data} =await axios.delete(`/api/admin/${id}`)
        dispatch({
            type:DELETE_ADMIN_SUCCESS,
            payload:data.success

        })
        
    } catch (error) {
        dispatch({
            type:DELETE_ADMIN_FAIL,
            payload:error.response.data.message
        })
    }
}


//clearing errors
export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}