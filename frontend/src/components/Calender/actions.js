
import { ALL_CALENDAR_FAIL, ALL_CALENDAR_REQUEST, ALL_CALENDAR_SUCCESS, CLEAR_ERRORS, CREATE_CALENDAR_FAIL, CREATE_CALENDAR_REQUEST, CREATE_CALENDAR_SUCCESS, DELETE_CALENDAR_FAIL, DELETE_CALENDAR_REQUEST, DELETE_CALENDAR_SUCCESS } from "./constants";
import axios from "axios";

export const getAllcalendars=()=>async(dispatch)=>{
    try {
        dispatch({type:ALL_CALENDAR_REQUEST});

        const {data}=await axios.get("/api/calendar")
        dispatch({
            type:ALL_CALENDAR_SUCCESS,
            payload:data,
        })
    } catch (error) {
        dispatch({
            type:ALL_CALENDAR_FAIL,
            payload:error.response.data.message
        })
    }
}

export const createCalendar=(calendarData)=>async(dispatch)=>{
    try {
        dispatch({type:CREATE_CALENDAR_REQUEST});
        const config = {
            headers: { "Content-Type": "application/json" },
          };
        const {data}=await axios.post("/api/calendar",calendarData,config)
        dispatch({
            type:CREATE_CALENDAR_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:CREATE_CALENDAR_FAIL,
            payload:error.response.data.message
        })
    }
}

export const deleteCalendar=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:DELETE_CALENDAR_REQUEST
        })
        const {data} =await axios.delete(`/api/calendar/${id}`)
        dispatch({
            type:DELETE_CALENDAR_SUCCESS,
            payload:data.success

        })
        
    } catch (error) {
        dispatch({
            type:DELETE_CALENDAR_FAIL,
            payload:error.response.data.message
        })
    }
}

//clearing errors
export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}