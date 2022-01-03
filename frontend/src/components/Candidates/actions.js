import {ALL_CANDIDATE_REQUEST,ALL_CANDIDATE_SUCCESS,ALL_CANDIDATE_FAIL,CLEAR_ERRORS,
    CREATE_CANDIDATE_REQUEST,CREATE_CANDIDATE_SUCCESS,CREATE_CANDIDATE_FAIL,
    DELETE_CANDIDATE_REQUEST,DELETE_CANDIDATE_SUCCESS,DELETE_CANDIDATE_FAIL,
     UPDATE_CANDIDATE_REQUEST, UPDATE_CANDIDATE_SUCCESS, UPDATE_CANDIDATE_FAIL,
     CANDIDATE_DETAILS_REQUEST, CANDIDATE_DETAILS_SUCCESS, CANDIDATE_DETAILS_FAIL
} from "./constants"
import axios from "axios";

//action to get all the clients
export const getAllCandidates=()=>async(dispatch)=>{
    try {
        dispatch({type:ALL_CANDIDATE_REQUEST});

        const {data}=await axios.get("/api/candidate")
        dispatch({
            type:ALL_CANDIDATE_SUCCESS,
            payload:data,
        })
    } catch (error) {
        dispatch({
            type:ALL_CANDIDATE_FAIL,
            payload:error.response.data.message
        })
    }
}
export const getCandidateDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: CANDIDATE_DETAILS_REQUEST });
  
      const { data } = await axios.get(`/api/candidate/${id}`);
  
      dispatch({
        type: CANDIDATE_DETAILS_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: CANDIDATE_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//create candidate action
export const createCandidate=(candidateData)=>async(dispatch)=>{
    try {
        dispatch({type:CREATE_CANDIDATE_REQUEST});
        const config="Content-Type :application/json";
        const {data}=await axios.post("/api/candidate",candidateData,config);
        dispatch({
            type:CREATE_CANDIDATE_SUCCESS,
            payload:data
        });
        
    } catch (error) {
        dispatch({
            type:CREATE_CANDIDATE_FAIL,
            payload:error.response.data.message
    })
    }
}

export const updateCandidate=(id,candidateData)=>async(dispatch)=>{
    try {
        dispatch({type:UPDATE_CANDIDATE_REQUEST})
        const config = {
            headers: { "Content-Type": "application/json" },
          };
        const {data}=await axios.put(`/api/candidate/${id}`,candidateData,config)
        dispatch({
            type:UPDATE_CANDIDATE_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:UPDATE_CANDIDATE_FAIL,
            payload:error.response.data.message
        })        
    }
}

//DELETE candidate action
export const deleteCandidate=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:DELETE_CANDIDATE_REQUEST
        })
        const {data} =await axios.delete(`/api/candidate/${id}`)
        dispatch({
            type:DELETE_CANDIDATE_SUCCESS,
            payload:data.success

        })
        
    } catch (error) {
        dispatch({
            type:DELETE_CANDIDATE_FAIL,
            payload:error.response.data.message
        })
    }
}



//clearing errors
export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}