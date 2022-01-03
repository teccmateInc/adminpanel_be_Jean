// import React from 'react'
import { UPDATE_ORDERS_RESET } from './constants';
import { makeStyles, Paper, } from '@material-ui/core'
import { Grid, TextField, Typography,Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import React,{useState,useEffect} from 'react'
import {clearErrors,updateOrder} from "./actions"
import { useDispatch,useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import {useParams } from 'react-router-dom'

const useStyle = makeStyles(theme => ({
    root: {

        textAlign:"center",
        '& .MuiFormControl-root': {

            width: '70%',
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
        width:400,
        margin:"20px auto"
        
    },
    typography:{
        maxWidth:"100%",
        textAlign:"center",
        alignItems:"center",
    
}

}))


const UpdateOrder = ({history}) => {
    const classes=useStyle();
    const dispatch = useDispatch();
    // const navigate=useNavigate();
    const {id}=useParams();
    const alert=useAlert();
    const {loading,isUpdated,error:updateError} = useSelector(state => state.updateOrder)
    const[order,setOrder]=useState({
        vaccine:"",
        notes:"",
        position:"",
        statusLead:"",
        sentProfile:"",
        
    })
    const {vaccine,notes,position,statusLead,sentProfile}=order
    const orderId=id;
    const orderSubmitHandler=(e)=>{
        e.preventDefault();
        dispatch(updateOrder(orderId,order));
        // console.log(clientId)
        
    }
    const updateOrderChange=(e)=>{
        setOrder({...order,[e.target.name]: e.target.value})
    }
    useEffect(() => {
        if(updateError){
            alert.error(updateError)
            dispatch(clearErrors());
        }
        if(isUpdated){
            alert.success("Order Updated Successfully!");
            history.push("/orders")
            dispatch({type:UPDATE_ORDERS_RESET})
        }
    }, [updateError,alert,dispatch,isUpdated,orderId])
    return (
        <div className='orderContainer'>
            <form encType='multipart/form-data' className={classes.root} onSubmit={orderSubmitHandler}>
                <Paper className={classes.pageContent}>
                <Typography>Order Information</Typography>
                <Grid container>
                    <Grid item xs={12} >
                    <FormControl variant='standard' >
                                <InputLabel id="demo-simple-select-standard-label">Vaccine</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    name='vaccine'
                                    value={vaccine}
                                    onChange={updateOrderChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>
                        <TextField variant="standard" label="notes" name='notes' value={notes} fullWidth onChange={updateOrderChange} />
                        <TextField variant="standard" label="Position" name='position' value={position} fullWidth onChange={updateOrderChange}/>
                        <TextField variant="standard" label="Status Lead" name='statusLead'  value={statusLead} fullWidth onChange={updateOrderChange}/>
                        <TextField variant="standard" label="Profile Sent" name='sentProfile'  fullWidth value={sentProfile} onChange={updateOrderChange} />
                    </Grid>
                    <Button type='submit' style={{backgroundColor:"rgb(21, 21, 116)" ,color:"white" ,marginTop:"2vmax"}} fullWidth variant='contained'>Update Order</Button>

                </Grid>
                </Paper>
            </form>
            
        </div>
    )
}

export default UpdateOrder
