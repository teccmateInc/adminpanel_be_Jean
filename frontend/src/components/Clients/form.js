import { makeStyles, Paper, } from '@material-ui/core'
import { Grid, TextField, Typography,Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material'
import React,{useState,useEffect} from 'react'
import SelectBox from '../Candidates/select'
import { clearErrors, createClient } from './actions'
import { useDispatch,useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { CREATE_CLIENT_RESET } from './constants'
import validate from "./validateInfo"
import { strictValidObjectWithKeys } from '../../helper/utils'

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

        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        alignItems:"center",
        
    },
    typography:{
        maxWidth:"100%",
        textAlign:"center",
        alignItems:"center",
    
}

}))



const Clientform = ({history}) => {
    const [errors,setErrors]=useState({})
    const classes=useStyle();
    const dispatch = useDispatch();
    const alert=useAlert();
    const {loading,success,error} = useSelector(state => state.newClient)
    const[client,setClient]=useState({
        firstname:"",
        lastname:"",
        email:"",
        phone:"",
        password:"",
        address:"",
        pa:"",
        state:"",
        zip_code:"",
        city:"",
        country:"",
        language:"",
        vaccine:"",
        admin_contact:"",
        summary_demand:"",
        title_demand:"",
        send_files:"",
    
    })
    const {firstname,lastname,email,password,phone,address,pa,state,zip_code,city,country,language,vaccine,admin_contact,summary_demand,title_demand,send_files}=client
    
    const CLientsubmitHandler=(e)=>{
        e.preventDefault();
        if (strictValidObjectWithKeys(validate(client)))setErrors(validate(client))
        else dispatch(createClient(client));
        // history.push("/clients");
        
    }
    const ClientonChangeHandler=(e)=>{
        setClient({...client,[e.target.name]: e.target.value})
    }
    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors());
        }
        if(success){
            alert.success("Client Created Successfully!");
            history.push("/clients")
            dispatch({type:CREATE_CLIENT_RESET})
        }
    }, [error,success,alert,dispatch])

    return (
        <div className='clientContainer'>

            <form encType='mulipart/form-data' onSubmit={CLientsubmitHandler}>
                <Typography className={classes.typography}>Client Information</Typography>
                <Paper className={classes.pageContent}>
                    <Grid container className={classes.root}>
                        <Grid item xs={12} md={6}>
                            <TextField variant="standard" label="First Name" name='firstname' value={firstname} error={errors.firstname ? true : false} helperText={errors.firstname && errors.firstname} fullWidth onChange={ClientonChangeHandler}/>
                            <TextField variant="standard" label="Last Name" name='lastname' value={lastname} error={errors.lastname ? true : false} helperText={errors.lastname && errors.lastname} fullWidth onChange={ClientonChangeHandler}/>
                            <TextField variant="standard" label="Email" name='email' value={email} error={errors.email ? true : false} helperText={errors.email && errors.email} fullWidth onChange={ClientonChangeHandler}/>
                            <TextField variant="standard" label="Address" name='address' value={address} error={errors.address ? true : false} helperText={errors.address && errors.address} fullWidth onChange={ClientonChangeHandler}/>
                            <TextField type="password" variant="standard" label="password" name='password' error={errors.password ? true : false} helperText={errors.password && errors.password} fullWidth value={password} onChange={ClientonChangeHandler} />
                            <TextField type="number" variant="standard" label="Phone" name='phone' error={errors.phone ? true : false} helperText={errors.phone && errors.phone} fullWidth value={phone} onChange={ClientonChangeHandler}/>
                            <TextField variant="standard" label="State" name='state' value={state} error={errors.state ? true : false} helperText={errors.state && errors.state} fullWidth onChange={ClientonChangeHandler}/>
                            <TextField variant="standard" label="Postal Code" name='zip_code' fullWidth value={zip_code} error={errors.zip_code ? true : false} helperText={errors.zip_code && errors.zip_code} onChange={ClientonChangeHandler}/>
                            <FormControl variant='standard' >
                                <InputLabel id="demo-simple-select-standard-label">Country</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    name='country'
                                    value={country}
                                    onChange={ClientonChangeHandler}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl variant='standard' >
                                <InputLabel id="demo-simple-select-standard-label">City</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    name='city'
                                    value={city}
                                    onChange={ClientonChangeHandler}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>
                            
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <TextField variant="standard" label="PA" name='pa' value={pa} onChange={ClientonChangeHandler}/>
                        <FormControl variant='standard' >
                                <InputLabel id="demo-simple-select-standard-label">Language</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    name='language'
                                    value={language}
                                    onChange={ClientonChangeHandler}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>
 
                            <TextField variant="standard" label="Contact Owner" name='admin_contact' value={admin_contact} error={errors.admin_contact ? true : false} helperText={errors.admin_contact && errors.admin_contact} onChange={ClientonChangeHandler}/>
                            <TextField variant="standard" label="Summry of the demand" name='summary_demand' value={summary_demand} error={errors.summary_demand ? true : false} helperText={errors.summary_demand && errors.summary_demand} onChange={ClientonChangeHandler}/>
                            <TextField variant="standard" label="Title of the demand" name='title_demand' value={title_demand} error={errors.title_demand ? true : false} helperText={errors.title_demand && errors.title_demand} onChange={ClientonChangeHandler}/>
                            <TextField variant="standard" label="Candidate Sent" name='send_files' value={send_files} error={errors.send_files ? true : false} helperText={errors.send_files && errors.send_files} onChange={ClientonChangeHandler}/>
                            <FormControl variant='standard' >
                                <InputLabel id="demo-simple-select-standard-label">Vaccine</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    name='vaccine'
                                    value={vaccine}
                                    onChange={ClientonChangeHandler}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button type="submit" style={{backgroundColor:"rgb(21, 21, 116)" ,color:"white" ,marginTop:"2vmax"}} fullWidth variant='contained'>Create Client</Button>
                </Paper>

            </form>
            
        </div>
    )
}

export default Clientform
