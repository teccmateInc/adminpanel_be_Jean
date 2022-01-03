import axios from "axios";
import { ALL_CLIENTS_REQUEST,ALL_CLIENTS_SUCCESS,ALL_CLIENTS_FAIL, CLEAR_ERRORS,
    DELETE_CLIENT_REQUEST,DELETE_CLIENT_SUCCESS,DELETE_CLIENT_FAIL,
     CREATE_CLIENT_FAIL, CREATE_CLIENT_REQUEST, CREATE_CLIENT_SUCCESS,
      UPDATE_CLIENT_REQUEST, UPDATE_CLIENT_SUCCESS, UPDATE_CLIENT_FAIL,
      CLIENT_DETAIL_REQUEST,CLIENT_DETAIL_SUCCESS,CLIENT_DETAIL_FAIL
} from "./constants";


//action to get all the clients
export const getAllClients=()=>async(dispatch)=>{
    try {
        dispatch({type:ALL_CLIENTS_REQUEST});

        const {data}=await axios.get("/api/client")
        dispatch({
            type:ALL_CLIENTS_SUCCESS,
            payload:data,
        })
    } catch (error) {
        dispatch({
            type:ALL_CLIENTS_FAIL,
            payload:error.response.data.message
        })
    }
}

export const getClientDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: CLIENT_DETAIL_REQUEST });
  
      const { data } = await axios.get(`/api/client/${id}`);
  
      dispatch({
        type: CLIENT_DETAIL_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: CLIENT_DETAIL_FAIL,
        payload: error.response.data.message,
      });
    }
  };


//create new Client
export const createClient=(clientData)=>async(dispatch)=>{
    try {
        dispatch({type:CREATE_CLIENT_REQUEST})
        const config = {
            headers: { "Content-Type": "application/json" },
          };
        const {data}=await axios.post("/api/client",clientData,config);
        if(data.success === true){
        dispatch({
            type:CREATE_CLIENT_SUCCESS,
            payload:data
        })
    }
    else{
        dispatch({
            type:CREATE_CLIENT_FAIL,
            payload:data.message
        })
    }
    } catch (error) {
        dispatch({
            type:CREATE_CLIENT_FAIL,
            payload:error.response.data.message
        })
    }
}

export const updateClient=(id,clientData)=>async(dispatch)=>{
    try {
        dispatch({type:UPDATE_CLIENT_REQUEST})
        const config = {
            headers: { "Content-Type": "application/json" },
          };
        const {data}=await axios.put(`/api/client/${id}`,clientData,config)
        dispatch({
            type:UPDATE_CLIENT_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:UPDATE_CLIENT_FAIL,
            payload:error.response.data.message
        })        
    }
}

export const deleteClient=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:DELETE_CLIENT_REQUEST
        })
        const {data} =await axios.delete(`/api/client/${id}`)
        dispatch({
            type:DELETE_CLIENT_SUCCESS,
            payload:data.success

        })
        
    } catch (error) {
        dispatch({
            type:DELETE_CLIENT_FAIL,
            payload:error.response.data.message
        })
    }
}

//clearing errors
export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}