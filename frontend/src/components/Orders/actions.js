import { ALL_ADMIN_REQUEST } from "../Admin/constants";
import { ALL_ORDERS_REQUEST,ALL_ORDERS_SUCCESS,ALL_ORDERS_FAIL,CLEAR_ERRORS, UPDATE_ORDERS_REQUEST, UPDATE_ORDERS_SUCCESS, UPDATE_ORDERS_FAIL, DELETE_ORDERS_REQUEST, DELETE_ORDERS_SUCCESS, DELETE_ORDERS_FAIL } from "./constants";
import axios from "axios";
export const getAllOrders=()=>async(dispatch)=>{
    try {
        dispatch({type:ALL_ADMIN_REQUEST})
        const {data}= await axios.get('/api/order')
        
        dispatch({
            type:ALL_ORDERS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ALL_ORDERS_FAIL,
            payload:error.response.data.message
        })        
    }
}

export const updateOrder=(id,orderData)=>async(dispatch)=>{
    try {
        dispatch({type:UPDATE_ORDERS_REQUEST})
        const config = {
            headers: { "Content-Type": "application/json" },
          };
        const {data}=await axios.put(`/api/order/${id}`,orderData,config)
        dispatch({
            type:UPDATE_ORDERS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:UPDATE_ORDERS_FAIL,
            payload:error.response.data.message
        })        
    }
}

export const deleteOrder=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:DELETE_ORDERS_REQUEST
        })
        const {data} =await axios.delete(`/api/order/${id}`)
        dispatch({
            type:DELETE_ORDERS_SUCCESS,
            payload:data.success

        })
        
    } catch (error) {
        dispatch({
            type:DELETE_ORDERS_FAIL,
            payload:error.response.data.message
        })
    }
}

export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}