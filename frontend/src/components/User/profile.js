import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getUserDetails } from './actions'
import { useAlert } from 'react-alert';
import { Box, makeStyles } from '@material-ui/core';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { removeFieldsFromObject, strictValidArray } from '../../helper/utils';
import { FIELDS,NONREQUIREDFIELDS } from '../../helper/constant';
const useStyles = makeStyles((theme) => ({
    profileGrid:{
        display:"flex !important",
        flexDirection:"column !important",
        margin:"auto",
        justifyContent:"center !important",
        alignItems:"center !important",
        
    },
    heading:{
        textAlign:"center"
    },
    gridItems:{
        display:"flex !important",
        padding:"0.5vmax 0 !important",
    fields:{
        padding:"2vmax"
    }
    }
}))

const Profile = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const alert = useAlert();
    const { user } = useSelector(state => state.login)
    const { user: profile, error, loading } = useSelector(state => state.profile)
    console.log(profile);
    // console.log(profile.firstname);
    useEffect(() => {
        if (user) {
            dispatch(getUserDetails(user.type))

        }
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [error, dispatch, alert, user])
    return (
        <Container>
                <Typography className={classes.heading} variant="h4">User's Profile</Typography>
                
                <Grid container className={classes.profileGrid}>
                    {/* <h1>Hello1</h1> */}
                    {profile && profile.map((item) => {
                        const renderFields= removeFieldsFromObject(item,NONREQUIREDFIELDS)
                        let v = Object.keys(renderFields)
                        console.log(renderFields,v)
                        if (strictValidArray(v)) {
                            return v.map((key, i) =>
                            <Grid item className={classes.gridItems}>
                                <Typography className={classes.fields} key={i}>{FIELDS[key]}</Typography>
                                <Typography key={i}>{`${renderFields[key]}`}</Typography>
                            </Grid>

                            )
                        }
                    })}
                </Grid>
        </Container>
        
    )
}

export default Profile
