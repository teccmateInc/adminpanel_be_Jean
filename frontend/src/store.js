import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { clientDetailsReducer, clientReducer, deleteClientReducer, newclientReducer, updateClientReducer } from "./components/Clients/reducer";
import { candidateDetailsReducer, candidateReducer, createCandidateReducer, deleteCandidateReducer, updateCandidatetReducer } from "./components/Candidates/reducer";
import { adminDetailsReducer, adminReducer, createAdminReducer, deleteAdminReducer, updateAdminReducer } from "./components/Admin/reducer";
import { LoginReducer, profileReducer } from "./components/User/reducer";
import { superAdminReducer } from "./components/superAdmin/reducer";
import { allOrdersReducer, deleteOrderReducer, updateOrderReducer } from "./components/Orders/reducers";
import { calendarsReducer, createCalendarReducer, deleteCalendarReducer, } from "./components/Calender/reducer";

const reducer=combineReducers({
    clients:clientReducer,
    clientDetails:clientDetailsReducer,
    newClient:newclientReducer,
    updateClient:updateClientReducer,
    deleteClient:deleteClientReducer,
    candidates:candidateReducer,
    createCandidate:createCandidateReducer,
    candidateDetails:candidateDetailsReducer,
    updateCandidate:updateCandidatetReducer,
    deleteCandidate:deleteCandidateReducer,
    admins:adminReducer,
    newAdmin:createAdminReducer,
    adminDetails:adminDetailsReducer,
    updateAdmin:updateAdminReducer,
    deleteAdmin:deleteAdminReducer,
    login:LoginReducer,
    // logout:logoutReducer,
    superadmin:superAdminReducer,
    orders:allOrdersReducer,
    deleteOrder:deleteOrderReducer,
    updateOrder:updateOrderReducer,
    profile:profileReducer,
    newCalendar:createCalendarReducer,
    calendars:calendarsReducer,
    deleteCalendar:deleteCalendarReducer
    
});
let user=JSON.parse(localStorage.getItem("user"))

let initialState={
    login:{
    user:user? user.data : {},
    }
};
const middleware=[thunk]
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;