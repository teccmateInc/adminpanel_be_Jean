import { makeStyles, Paper, Select, MenuItem, InputLabel, FormControl, Button } from '@material-ui/core'
import { Grid, TextField, Typography } from '@mui/material'
import React,{useEffect, useState} from 'react'
import { useAlert } from 'react-alert'
import { clearErrors, getAdminDetails, updateAdmin } from './actions'
import { useDispatch,useSelector } from 'react-redux'
import { UPDATE_ADMIN_RESET } from './constants'
import { useLocation, useParams } from 'react-router-dom';
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


const UpdateAdmin = ({history}) => {
    const classes=useStyle();
    const alert=useAlert();
    const dispatch = useDispatch();
    const location = useLocation()
    let userId=location.state.id
    const [errors,setErrors]=useState({})
    // const navigate=useNavigate();
    const {id}=useParams();
    const {loading,error:updateError,isUpdated}=useSelector(state =>state.updateAdmin)
    const {admin,error}=useSelector(state=>state.adminDetails)
    const [Admin, setAdmin] = useState({
        firstname:admin.firstname,
        lastname:admin.lastname,
        email:admin.email,
        password:admin.password
    })
    const adminId=id;
    const {firstname,lastname,email,password}=Admin

const AdminsubmitHandler=(e)=>{
    e.preventDefault();
    if(strictValidObjectWithKeys(validate(Admin))) setErrors(validate(Admin))
    else dispatch(updateAdmin(adminId,Admin))
}
const newAdminChange=(e)=>{
    setAdmin({...Admin, [e.target.name]: e.target.value})
}

useEffect(() => {
    if(admin && admin._id !== userId){
        dispatch(getAdminDetails(userId))
    }
    if(updateError){
        alert.error(updateError)
        dispatch(clearErrors());
    }
    if(isUpdated){
        alert.success('Admin updated Successfully!');
        history.push("/admins")
        dispatch({
            type:UPDATE_ADMIN_RESET
        })
    }
}, [updateError,dispatch,isUpdated,alert,admin,userId])

    return (
        <div className='adminContainer'>

            <form encType='multipart/form-data' className={classes.admin} onSubmit={AdminsubmitHandler}>
                <Paper className={classes.pageContent}>
                <Typography>Admin Information</Typography>
                <Grid container>
                    <Grid item xs={12} >
                        <TextField variant="standard" label="firstname" name='firstname' value={firstname} error={errors.firstname ? true :false} helperText={errors.firstname && errors.firstname} fullWidth onChange={newAdminChange} />
                        <TextField variant="standard" label="lastname" name='lastname' value={lastname} error={errors.lastname ? true :false} helperText={errors.lastname && errors.lastname} fullWidth onChange={newAdminChange}/>
                        <TextField variant="standard" label="email" name='email'  value={email} error={errors.email ? true :false} helperText={errors.email && errors.email} fullWidth onChange={newAdminChange}/>
                        <TextField type="password" variant="standard" label="password" name='password'  fullWidth value={password} error={errors.password ? true :false} helperText={errors.password && errors.password} onChange={newAdminChange} />
                    </Grid>
                    <Button type='submit' style={{backgroundColor:"rgb(21, 21, 116)" ,color:"white" ,marginTop:"2vmax"}} fullWidth variant='contained'>Update Admin</Button>

                </Grid>
                </Paper>
            </form>
            
        </div>
    )
}

export default UpdateAdmin