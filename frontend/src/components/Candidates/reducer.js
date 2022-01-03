import {ALL_CANDIDATE_REQUEST,ALL_CANDIDATE_SUCCESS,ALL_CANDIDATE_FAIL,CLEAR_ERRORS,
    CREATE_CANDIDATE_REQUEST,CREATE_CANDIDATE_SUCCESS,CREATE_CANDIDATE_FAIL,CREATE_CANDIDATE_RESET,
    DELETE_CANDIDATE_REQUEST,DELETE_CANDIDATE_SUCCESS,DELETE_CANDIDATE_FAIL,DELETE_CANDIDATE_RESET,
     UPDATE_CANDIDATE_RESET, UPDATE_CANDIDATE_FAIL, UPDATE_CANDIDATE_SUCCESS, UPDATE_CANDIDATE_REQUEST,
      CANDIDATE_DETAILS_REQUEST, CANDIDATE_DETAILS_SUCCESS, CANDIDATE_DETAILS_FAIL
} from "./constants"

export const candidateReducer=(state={candidates:[]},action)=>{
    switch (action.type) {
        case ALL_CANDIDATE_REQUEST:
            return{
                loading:true,
                candidates:[]

            }
            
        case ALL_CANDIDATE_SUCCESS:
            return{
                loading:false,
                candidates:action.payload.data
            }
        case ALL_CANDIDATE_FAIL:
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

export const candidateDetailsReducer = (state = { candidate: {} }, action) => {
    switch (action.type) {
      case CANDIDATE_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case CANDIDATE_DETAILS_SUCCESS:
        return {
          loading: false,
          candidate: action.payload,
        };
      case CANDIDATE_DETAILS_FAIL:
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

export const createCandidateReducer=(state={candidate:{}},action)=>{
    switch (action.type) {
        case CREATE_CANDIDATE_REQUEST:
            return{
                ...state,
                loading:true,

            };
        case CREATE_CANDIDATE_SUCCESS:
            return{
                loading:false,
                candidate:action.payload.data,
                success:action.payload.success
            };
        case CREATE_CANDIDATE_FAIL:
            return{
                loading:false,
                error:action.payload
            }
            case CREATE_CANDIDATE_RESET:
                return{
                success:false,
                loading:false
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

export const updateCandidatetReducer=(state={candidate:{}},action)=>{
    switch (action.type) {
        case UPDATE_CANDIDATE_REQUEST:
            return{
                ...state,
                loading:true
            }
        case UPDATE_CANDIDATE_SUCCESS:
            return{
                ...state,
                loading:false,
                isUpdated:action.payload

            }
        case UPDATE_CANDIDATE_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload.data

            }   
        case UPDATE_CANDIDATE_RESET:
            return{
                ...state,
                isUpdated:false
            } 
        default:
           return state;
    }
}

export const deleteCandidateReducer=(state={candidate:{}},action)=>{
    switch (action.type) {
        case DELETE_CANDIDATE_REQUEST:
            return{
                ...state,
                loading:true
            }
        case DELETE_CANDIDATE_SUCCESS:
            return{
                ...state,
                loading:false,
                isDeleted:action.payload
            }
        case DELETE_CANDIDATE_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case DELETE_CANDIDATE_RESET:
            return{     
                ...state,
                isDeleted:false
            }
        default:
            return state;
    }
}