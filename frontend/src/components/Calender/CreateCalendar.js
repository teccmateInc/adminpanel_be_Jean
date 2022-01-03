import { Card, Container, Paper, TextField, Typography } from '@mui/material'
import React,{useEffect, useState} from 'react';
import {makeStyles,Button} from '@material-ui/core';
import { clearErrors, createCalendar } from './actions';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import moment from "moment"

const useStyle = makeStyles(theme => ({
    main:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        textAlign:"center",
        marginTop:theme.spacing(5),
        // width:"50% !important",
        height:"50vh !important"
    },
    pageContent:{
        // width:"100%",
        padding:"30px 0"

    },
    card:{
        display:"flex",
        // width:"80% !important",
        flexDirection:"column",
        margin:"20px 0",
        alignItems:"center",
        justifyContent:"center",
        // justifyContent:"space-evenly"
    },
    container:{
        padding:theme.spacing(3)
    }
}))

const CreateCalendar = ({history}) => {
    const dispatch = useDispatch();
    const alert=useAlert();
    const {loading,error,success} = useSelector(state => state.newCalendar)
    const [calendar, setCalendar] = useState({
        date:"",
        from:"",
        to:""
    })
    const {date,from,to}=calendar
    const calendarSubmit=(e)=>{
        e.preventDefault();
        dispatch(createCalendar(calendar))
    }

    const onChangeHandler=(e)=>{
        let {name,value}=e.target
        setCalendar({...calendar,[name]:value })
    }
    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(success){
            alert.success("Calendar Created successfully")
            history.push("/calendars")
        }
    }, [alert,dispatch,success,history])
    let classes=useStyle()
    return (
        <div>
            <Container className={classes.main}>
                <Paper className={classes.pageContent} >
                    <form onSubmit={calendarSubmit}>
                    <div className={classes.container}>
                    <Typography variant='h6'>Availability Date</Typography>
                    <TextField style={{width:"50%"}} type="date"  name="date" value={date} onChange={onChangeHandler}/>    
                    </div>
                    <Typography variant='h6'>Availability Time</Typography>
                    {/* <Card className={classes.card}> */}
                    <Typography>From</Typography>
                    <TextField style={{width:"50%"}} type="time" name="from" value={from} onChange={onChangeHandler}/>
                    <Typography>To</Typography>
                    <TextField style={{width:"50%"}} type="time" name="to" value={to} onChange={onChangeHandler}/>                    
                    {/* </Card> */}
                    <Button type='submit' style={{backgroundColor:"rgb(21, 21, 116)" ,color:"white" ,marginTop:"2vmax", width:"60%"}}  variant='contained'>Create Calendar</Button>

                    </form>
                </Paper>
            </Container>
        </div>
    )
}

export default CreateCalendar
