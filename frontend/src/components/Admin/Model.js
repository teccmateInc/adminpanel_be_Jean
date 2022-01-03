// import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Container, Grid, makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        // position: 'absolute',
        // top: '50%',
        // left: '50%',
        // transform: 'translate(-50%, -50%)',
        margin:"auto",
        width: 500,
        height: 600,
        backgroundColor: 'white',
        border: '2px solid #000',
        // paddingTop:theme.spacing(3),
        boxShadow: 24,
        padding: 40,
    },
   
    cardElement:{
        display:'flex',
        // marginRight:"2vmax",
        fontFamily:"Roboto"
    }
})
)


export default function BasicModal({ isOpen, id,setModel }) {
    // console.log(id)
    const classes=useStyles();
    const [open, setOpen] = React.useState(!isOpen);
    const [admin, setAdmin] = useState({});

    //   const handleOpen = () => setOpen(true);
    //   const handleClose = () => setOpen(false);
    useEffect(async () => {
        if (id !== null) {
            await axios.get(`/api/admin/${id}`)
                .then(res => {
                    console.log(res)
                    setAdmin(res.data.data)
                    // console.log(admin)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [id])

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={isOpen}
                onClose={()=>setModel({open:false,id:null})}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Container>
                <Grid container className={classes.root}>
                    <Grid item xs={12}>
                    <Typography id="modal-modal-title" variant="h4" >
                        {admin.firstname}'s Information
                    </Typography>
                    </Grid>
                    <Grid item xs={12} >
                            <div className={classes.cardElement}>
                                <Typography variant="h5" id="modal-modal-description" > First Name : </Typography>
                                <Typography variant="h5" id="modal-modal-description" > {admin.firstname} </Typography>
                            </div>
                            <div className={classes.cardElement}>
                                <Typography variant="h5" id="modal-modal-description" > Last Name : </Typography>
                                <Typography variant="h5" id="modal-modal-description" > {admin.lastname} </Typography>
                            </div>
                            <div className={classes.cardElement}>
                                <Typography variant="h5" id="modal-modal-description" > Email : </Typography>
                                <Typography variant="h5" id="modal-modal-description" > {admin.email} </Typography>
                            </div>
                    </Grid>
                </Grid>
                </Container>
            </Modal>
        </div>
    );
}