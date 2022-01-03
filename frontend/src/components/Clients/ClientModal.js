import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Container, makeStyles } from '@material-ui/core';
import "./model.css"
const useStyles = makeStyles((theme) => ({
    root: {
        width:"80vw",
        maxWidth:"80%",
        position: 'absolute',
        // justi,
        // top: '50%',
        // left: '50%',
        // transform: 'translate(-50%, -50%)',
        marginTop:theme.spacing(5),
        // marginRight:`${theme.spacing(5)} !important`,
        // width: 600,
        height: 600,
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        padding: 40,
    },
    card:{

        display:"flex",
        // width:600,
        // justifyContent:"center",
        // alignItems:"center",
        padding:"3vmax",
        marginTop:"3vmax",

    },
    cardElement:{
        display:'flex',
        marginRight:"2vmax",
        fontFamily:"Roboto"
    },
    content:{
        width:"50%",
    }
})
)


export default function BasicModal({ isOpen, id,setModel }) {
    // console.log(id)
    const classes=useStyles();
    // const [open, setOpen] = React.useState(isOpen);
    const [client, setClient] = useState({});

    //   const handleOpen = () => setOpen(true);
    //   const handleClose = () => setOpen(false);
    useEffect(async () => {
        if (id !== null) {
            await axios.get(`/api/client/${id}`)
                .then(res => {
                    console.log(res)
                    setClient(res.data.data)
                    console.log(client)
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
                    <Grid container className={classes.root} justifyContent='center' alignItems='center'>
                    <Grid item xs={12}>
                    <Typography xs={12} id="modal-modal-title" variant="h4" component="h2">
                        {client.firstname}'s Information
                    </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    {/* <Card className={classes.card}> */}
                        {/* <CardContent className={classes.content}> */}
                            <div className='modal-section'>
                            <div>
                           <p>First Name:</p>
                           <span>{client && client.firstname}</span>
                           </div>
                           <div>
                           <p>Last Name:</p>
                           <span>{client && client.lastname}</span>
                           </div>
                           <div>
                           <p>Email:</p>
                           <span>{client && client.email}</span>
                           </div>
                           <div>
                           <p>Phone:</p>
                           <span>{client && client.phone}</span>
                           </div>
                           <div>
                           <p>State:</p>
                           <span>{client && client.state}</span>
                           </div>
                           <div>
                           <p>Address:</p>
                           <span>{client && client.address}</span>
                           </div>
                           <div>
                           <p>Postal Code:</p>
                           <span>{client && client.zip_code}</span>
                           </div>
                           </div>
                           <div >

                           </div>
                           </Grid>
                        {/* </CardContent> */}
                        {/* <CardContent className={classes.content}> */}
                        <Grid item xs={12} md={6}>
                        <div className='modal-section'>
                        <div>
                           <p>Postal Code:</p>
                           <span>{client && client.zip_code}</span>
                           </div>
                           
                           <div>
                           <p>Personal Assistant:</p>
                           <span>{client && client.pa}</span>
                           </div>
                           <div>
                           <p>City:</p>
                           <span>{client && client.city}</span>
                           </div>
                           <div>
                           <p>Country:</p>
                           <span>{client && client.country}</span>
                           </div>
                           <div>
                           <p>Contact Admin:</p>
                           <span>{client && client.admin_contact}</span>
                           </div>
                           <div>
                           <p>Summary Demand:</p>
                           <span>{client && client.summary_demand}</span>
                           </div>
                           <div>
                           <p>Title Demand:</p>
                           <span>{client && client.title_demand}</span>
                           </div>
                           <div>
                           <p>Send Files:</p>
                           <span>{client && client.send_files}</span>
                           </div>
                           <div>
                           <p>Vaccine:</p>
                           <span>{client && client.vaccine}</span>
                           </div>
                           <div>
                           <p>Language:</p>
                           <span>{client && client.admin_language}</span>
                           </div>
                           </div>
                        {/* </CardContent> */}
                    {/* </Card> */}
                    </Grid>
                </Grid>
                </Container>
            </Modal>
        </div>
    );
}