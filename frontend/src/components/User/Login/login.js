import { Avatar, Button, Grid, Paper, TextField } from '@material-ui/core';
import { MailOutline,LockOpen, Visibility, VisibilityOff,LockOutlined } from '@mui/icons-material';
import React,{useState,useEffect} from 'react';
import { useAlert } from 'react-alert';
import { useSelector,useDispatch, } from 'react-redux';
import { clearErrors, login } from '../actions';
import {useHistory} from "react-router-dom"
import "./login.css";
import { strictValidObjectWithKeys } from '../../../helper/utils';

const Login = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const history=useHistory()

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword,setLoginPassword]=useState("");
    
    const {error,loading,user}=useSelector((state)=>state.login)

    const loginSubmit=(e)=>{
        e.preventDefault();
        dispatch(login(loginEmail,loginPassword))
    }
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(strictValidObjectWithKeys(user)){
            console.log(user)
            history.push("/profile");
        }
    }, [error,user])
        const paperStyle={padding:20,height:'70vh',width:280,margin:"20px auto"}
        const avatarStyle={backgroundColor:"rgba(21, 21, 116, 0.8)"}
    return (
        <Grid>
            <form onSubmit={loginSubmit}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                <Avatar style={avatarStyle}><LockOutlined /></Avatar>
                <h2 className='login-heading'>Login</h2>
                </Grid>
                <div className='email'>
                <MailOutline xs={2}/>
                <TextField xs={9} type="email" label="Email" placeholder='Enter Your Email' fullWidth required value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)}/>
                </div>
                <div className='email'>
                <LockOpen xs={2}/>
                <TextField type='password' xs={9} label="Password" placeholder='Enter Your Password' fullWidth required value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)}/>
                </div>
                <div className='loginBtn'>
                <Button type='submit' style={{backgroundColor:"rgb(21, 21, 116)" ,color:"white"}} fullWidth variant='contained'>LOGIN</Button>
                </div>
            </Paper>
            </form>
        </Grid>
    )
}

export default Login;
