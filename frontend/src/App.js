import './App.css';
import {BrowserRouter as Router,Route, Switch} from "react-router-dom";
import WebFont from 'webfontloader';
import React,{useEffect} from 'react';
import Clients from './components/Clients/index';
import SuperAdminHeader from "./components/Header/Header.js"
import Candidates from './components/Candidates/index';
import Admins from './components/Admin/index';
import SuperAdmin from "./components/superAdmin/index" 
import Login from "./components/User/Login/login.js"
import Form from './components/Candidates/form';
import Clientform from './components/Clients/form';
import Adminform from './components/Admin/form';
import UpdateAdmin from "./components/Admin/updateForm"
import { CssBaseline } from '@material-ui/core';
import UpdateClient from './components/Clients/updateForm';
import ProtectedRoute from './ProtectedRoute';
import Orders from './components/Orders';
import { useSelector } from 'react-redux';
import UpdateCandidate from './components/Candidates/updateForm';
import UpdateOrder from './components/Orders/updateOrder';
import Profile from './components/User/profile';
import AdminHeader from "./components/Header/AdminHeader.js"
import CandidateHeader from "./components/Header/CandidateHeader.js"
import CreateCalendar from './components/Calender/CreateCalendar';
import Calendars from './components/Calender/index';

function App() {
  const {user}=useSelector(state=>state.login)
  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      },

    })
  },[]);
  // let user=JSON.parse(localStorage.getItem("user"))
  // login:{
  //   user: user.data ?? {},
  //   }
  console.log("App" ,user)
  return (
    <div className="App">
      <Router >
      { user 
       && user.type =="superadmin" 
        ?
      <SuperAdminHeader />
      : user 
      && user.type =="admin"
      ?
      <AdminHeader />
      : user 
      && user.type=="candidate"
      ?
      <CandidateHeader />
      :
      (null)
        }
        
      <Switch>
        <ProtectedRoute isUpper={true} exact path="/candidates" component={Candidates} />
        <ProtectedRoute isUpper={true} exact path="/candidate/:id" component={UpdateCandidate} />
        <ProtectedRoute isUpper={true} exact  path="/clients" component={Clients} />
        <ProtectedRoute isUpper={true} exact  path="/newClient" component={Clientform } />
        <ProtectedRoute isUpper={true} exact path="/client/:id" component={UpdateClient} />
        <ProtectedRoute isSuperAdmin={true} exact path="/admins" component={ Admins  } />
        <ProtectedRoute isSuperAdmin={true} exact path="/newAdmin" component={Adminform } />
        <ProtectedRoute isSuperAdmin={true} exact path="/admin/:id" component={UpdateAdmin } />
        <ProtectedRoute isSuperAdmin={true} exact path="/superadmin" component={ SuperAdmin  } />
        <Route exact path="/Login" component={Login }/>
        <ProtectedRoute isUpper={true} exact path ="/newCandidate" component={Form} />
        <ProtectedRoute isUpper={true} exact path="/orders" component={Orders}/>
        <ProtectedRoute isUpper={true} exact path="/order/:id" component={UpdateOrder} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute isUpper={true} exact path="/calendars" component={Calendars} />
        <ProtectedRoute isCandidate={true} exact path="/newCalendar" component={CreateCalendar} />
      
      </Switch>
      

        
      </Router>
      <CssBaseline />
    </div>
  );
}

export default App;
