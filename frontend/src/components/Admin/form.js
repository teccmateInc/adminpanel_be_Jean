import { makeStyles, Paper, Select, MenuItem, InputLabel, FormControl, Button } from '@material-ui/core'
import { Grid, TextField, Typography } from '@mui/material'
import React,{useEffect, useState} from 'react'
import { useAlert } from 'react-alert'
import { clearErrors, createAdmin } from './actions'
import { useDispatch,useSelector } from 'react-redux'
import { CREATE_ADMIN_RESET } from './constants'
import validate from "./validateInfo"
import { strictValidObjectWithKeys } from '../../helper/utils'


const useStyle = makeStyles(theme => ({
    admin: {
        // margin: theme.spacing(3),
        textAlign:"center",
        '& .MuiFormControl-root': {

            // width: '70%',
            // padding:theme.spacing(1),
            marginTop: theme.spacing(2) ,
            marginBottom: theme.spacing(1) ,
            borderRadius: '4px',
            backgroundColor: 'white'
            

        }
    },
    pageContent: {

        padding:20,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:"center",

        height:'70vh',
        width:300,
        margin:"20px auto"

    },

}))

const Adminform = ({history}) => {
    const classes=useStyle();
    const alert=useAlert();
    const dispatch = useDispatch();
    const [errors,setErrors]=useState({})
    const {loading,error,success} = useSelector(state => state.newAdmin);
    const [admin, setAdmin] = useState({
        firstname:"",
        lastname:"",
        email:"",
        password:""
    })
    const {firstname,lastname,email,password}=admin

const AdminsubmitHandler=(e)=>{
    e.preventDefault();
    if(strictValidObjectWithKeys(validate(admin))) setErrors(validate(admin))
    else dispatch(createAdmin(admin))
}
const newAdminChange=(e)=>{
    setAdmin({...admin, [e.target.name]: e.target.value})
}

useEffect(() => {
    if(error){
        alert.error(error)
        dispatch(clearErrors());
    }
    if(success){
        alert.success('Admin created Successfully!');
        history.push("/admins")
        dispatch({
            type:CREATE_ADMIN_RESET
        })
    }
}, [error,dispatch,alert,success])

    return (
        <div className='adminContainer'>

            <form encType='multipart/form-data' className={classes.admin} onSubmit={AdminsubmitHandler}>
                <Paper className={classes.pageContent}>
                <Typography>Admin Information</Typography>
                <Grid container>
                    <Grid item xs={12} >
                        <TextField variant="standard" label="firstname" name='firstname' value={firstname} error={errors.firstname ? true :false} helperText={errors.firstname && errors.firstname} fullWidth onChange={newAdminChange} />
                        <TextField variant="standard" label="lastname" name='lastname' value={lastname} error={errors.lastname ? true :false} helperText={errors.lastname && errors.lastname} fullWidth onChange={newAdminChange}/>
                        <TextField variant="standard" label="email" name='email' value={email} fullWidth error={errors.email ? true :false} helperText={errors.email && errors.email} onChange={newAdminChange}/>
                        <TextField type="password" variant="standard" label="password" name='password' error={errors.password ? true :false} helperText={errors.password && errors.password}  fullWidth value={password} onChange={newAdminChange} />
                    </Grid>
                    <Button type='submit' style={{backgroundColor:"rgb(21, 21, 116)" ,color:"white" ,marginTop:"2vmax"}} fullWidth variant='contained'>Create Admin</Button>

                </Grid>
                </Paper>
            </form>
            
        </div>
    )
}

export default Adminform