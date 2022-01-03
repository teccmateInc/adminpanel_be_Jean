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
        width:"80vw",
        maxWidth:"80%",
        position: 'absolute',
        overflow:"scroll",
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
    const [open, setOpen] = React.useState(!isOpen);
    const [candidate, setCandidate] = useState({});

    //   const handleOpen = () => setOpen(true);
    //   const handleClose = () => setOpen(false);
    useEffect(async () => {
        if (id !== null) {
            await axios.get(`/api/candidate/${id}`)
                .then(res => {
                    console.log(res)
                    setCandidate(res.data.data)
                    // console.log(admin)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [id])

    return (
        <div>
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
                        {candidate.firstname}'s Information
                    </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    {/* <Card className={classes.card}> */}
                        {/* <CardContent className={classes.content}> */}
                            <div className='modal-section'>
                            <div>
                           <p>First Name:</p>
                           <span>{candidate && candidate.firstname}</span>
                           </div>
                           <div>
                           <p>Last Name:</p>
                           <span>{candidate && candidate.lastname}</span>
                           </div>
                           <div>
                           <p>Email:</p>
                           <span>{candidate && candidate.email}</span>
                           </div>
                           <div>
                           <p>Phone:</p>
                           <span>{candidate && candidate.phone}</span>
                           </div>
                           <div>
                           <p>Mobile:</p>
                           <span>{candidate && candidate.mobile}</span>
                           </div>
                           <div>
                           <p>Language:</p>
                           <span>{candidate && candidate.language}</span>
                           </div>
                           <div>
                           <p>Birthdate:</p>
                           <span>{candidate && candidate.birthdate}</span>
                           </div>
                           
                           <div>
                           <p>Postal Code:</p>
                           <span>{candidate && candidate.postal_code}</span>
                           </div>
                           <div>
                           <p>Skype:</p>
                           <span>{candidate && candidate.skype}</span>
                           </div>
                           <div>
                           <p>Website:</p>
                           <span>{candidate && candidate.website}</span>
                           </div>
                           <div>
                           <p>Country:</p>
                           <span>{candidate && candidate.country}</span>
                           </div>
                           <div>
                           <p>City:</p>
                           <span>{candidate && candidate.city}</span>
                           </div>
                           <div>
                           <p>Nationality:</p>
                           <span>{candidate && candidate.nationality}</span>
                           </div>
                           <div>
                           <p>Street:</p>
                           <span>{candidate && candidate.street}</span>
                           </div>
                           <div>
                           <p>Marital Status:</p>
                           <span>{candidate && candidate.status_marital}</span>
                           </div>
                           <div>
                           <p>Couple:</p>
                           <span>{candidate && candidate.couple}</span>
                           </div>
                           <div>
                           <p>Spouse Name:</p>
                           <span>{candidate && candidate.spouse_name}</span>
                           </div>
                           <div>
                           <p>Candidate Status:</p>
                           <span>{candidate && candidate.status_candidate}</span>
                           </div>
                           <div>
                           <p>Interview Done:</p>
                           <span>{candidate && candidate.interview_done}</span>
                           </div>
                           <div>
                           <p>Info Status:</p>
                           <span>{candidate && candidate.status_info}</span>
                           </div>
                           <div>
                           <p>Canton:</p>
                           <span>{candidate && candidate.canton}</span>
                           </div>
                           <div>
                           <p>Mission Type:</p>
                           <span>{candidate && candidate.mission_type}</span>
                           </div>
                           </div>
                           </Grid>
                        {/* </CardContent> */}
                        {/* <CardContent className={classes.content}> */}
                        <Grid item xs={12} md={6}>
                        <div className='modal-section'>
                        
                           
                           <div>
                           <p>Personal Car:</p>
                           <span>{candidate && candidate.personal_car}</span>
                           </div>
                           <div>
                           <p>Car License:</p>
                           <span>{candidate && candidate.car_license}</span>
                           </div>
                           <div>
                           <p>Boat License:</p>
                           <span>{candidate && candidate.boat_license}</span>
                           </div>
                           <div>
                           <p>Working License:</p>
                           <span>{candidate && candidate.work_permit}</span>
                           </div>
                           <div>
                           <p>Experience:</p>
                           <span>{candidate && candidate.experience}</span>
                           </div>
                           <div>
                           <p>Main Function:</p>
                           <span>{candidate && candidate.main_function}</span>
                           </div>
                           <div>
                           <p>Functions:</p>
                           <span>{candidate && candidate.functions}</span>
                           </div>
                           <div>
                           <p>Living2:</p>
                           <span>{candidate && candidate.living2}</span>
                           </div>
                          
                           <div>
                           <p>Working place:</p>
                           <span>{candidate && candidate.working_place}</span>
                           </div>
                           <div>
                           <p>Working Days:</p>
                           <span>{candidate && candidate.working_days}</span>
                           </div>
                           <div>
                           <p>Animal:</p>
                           <span>{candidate && candidate.animal}</span>
                           </div>
                           <div>
                           <p>Smoker:</p>
                           <span>{candidate && candidate.smoker}</span>
                           </div>
                           <div>
                           <p>travel:</p>
                           <span>{candidate && candidate.travel}</span>
                           </div>
                           <div>
                           <p>Vaccine:</p>
                           <span>{candidate && candidate.vaccine}</span>
                           </div>
                           <div>
                           <p>Desired Salary:</p>
                           <span>{candidate && candidate.salary_chf}</span>
                           </div>
                           <div>
                           <p>Other Salary:</p>
                           <span>{candidate && candidate.salary_other}</span>
                           </div>
                           <div>
                           <p>13th Salary:</p>
                           <span>{candidate && candidate.salary_13}</span>
                           </div>
                           <div>
                           <p>Hourly Wage:</p>
                           <span>{candidate && candidate.salary_hour}</span>
                           </div>
                           <div>
                           <p>Certificate:</p>
                           <span>{candidate && candidate.certificate}</span>
                           </div>
                           <div>
                           <p>Reference Feedback</p>
                           <span>{candidate && candidate.feedback_ref}</span>
                           </div>
                           <div>
                           <p>Interview Feedback:</p>
                           <span>{candidate && candidate.feedback_interview}</span>
                           </div>
                           <div>
                           <p>More Infos:</p>
                           <span>{candidate && candidate.infos}</span>
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