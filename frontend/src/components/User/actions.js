import { LOGIN_SUCCESS,LOGIN_REQUEST,LOGIN_FAIL,CLEAR_ERRORS, LOGOUT_SUCCESS, LOGOUT_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL } from "./constants";
import axios from "axios";
export const login =(email,password)=>async(dispatch)=>{
    try {
        dispatch({
            type:LOGIN_REQUEST
        })

        const config={headers:{"Content-Type":"application/json"}};

        const {data}=await axios.post('/api/user/login',{email,password})
        if(data.success === true){
    dispatch({
        type:LOGIN_SUCCESS,
        payload:data
    })
    localStorage.setItem("user",JSON.stringify({...data}));
}
    else{
        dispatch({
            type:LOGIN_FAIL,
            payload:data.message
        }) 
    }
    } catch (error) {
        dispatch({
            type:LOGIN_FAIL,
            payload:error.response.data.message
        })    
    }
}

//logout User
export const logout=()=>async(dispatch)=>{
    try {
        await axios.get('/api/user/logout');
        dispatch({
            type:LOGOUT_SUCCESS,
        })
        localStorage.clear();
    } catch (error) {
        dispatch({
            type:LOGOUT_FAIL,
            payload:error.response.data.message
        })
    }
}
export const getUserDetails=(type)=>async(dispatch)=>{
    try {
        dispatch({type:USER_DETAILS_REQUEST})
        const {data}=await axios.get(`/api/${type}/me`)
        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:USER_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}
//clearing errors
export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}