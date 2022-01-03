import { ALL_CALENDAR_FAIL, ALL_CALENDAR_REQUEST, ALL_CALENDAR_SUCCESS, CLEAR_ERRORS, CREATE_CALENDAR_FAIL, CREATE_CALENDAR_REQUEST, CREATE_CALENDAR_RESET, CREATE_CALENDAR_SUCCESS, DELETE_CALENDAR_FAIL, DELETE_CALENDAR_REQUEST, DELETE_CALENDAR_RESET, DELETE_CALENDAR_SUCCESS } from "./constants"

export const calendarsReducer=(state={calendars:[]},action)=>{
    switch (action.type) {
        case ALL_CALENDAR_REQUEST:
            return{
                loading:true,
                calendars:[]

            }
            
        case ALL_CALENDAR_SUCCESS:
            return{
                loading:false,
                calendars:action.payload.data
            }
        case ALL_CALENDAR_FAIL:
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
    }

export const createCalendarReducer=(state={calendar:{}},action)=>{
    switch (action.type) {
        case CREATE_CALENDAR_REQUEST:
            return{
                ...state,
                loading:true,
            }
    
        case CREATE_CALENDAR_SUCCESS:
            return{
                loading:false,
                calendar:action.payload.data,
                success:action.payload.success
            }

        case CREATE_CALENDAR_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case CREATE_CALENDAR_RESET:
            return{
                loading:false,
                success:false
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
                }
        default:
            return state;
    }
}


export const deleteCalendarReducer=(state={calendar:{}},action)=>{
    switch (action.type) {
        case DELETE_CALENDAR_REQUEST:
            return{
                ...state,
                loading:true
            }
        case DELETE_CALENDAR_SUCCESS:
            return{
                ...state,
                loading:false,
                isDeleted:action.payload

            }
        case DELETE_CALENDAR_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload.data

            }   
        case DELETE_CALENDAR_RESET:
            return{
                ...state,
                isDeleted:false
            } 
        default:
           return state;
    }
}