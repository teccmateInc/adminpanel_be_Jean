import { Box, Grid, TextField, Typography } from '@mui/material'
import { makeStyles, Paper, Select, MenuItem, InputLabel, FormControl, Button,FormHelperText } from '@material-ui/core'
import React, { useState,useEffect } from 'react'
import './form.css'
import { useDispatch,useSelector } from 'react-redux'
import SelectBox from './select';
import { clearErrors, getCandidateDetails, updateCandidate } from './actions';
import {useAlert} from 'react-alert'
import { UPDATE_CANDIDATE_RESET } from './constants'
import { useLocation, useParams } from 'react-router-dom'
import validate from "./validateInfo";
import { strictValidObjectWithKeys } from '../../helper/utils'


const useStyle = makeStyles(theme => ({
    candidate_root: {
        margin: theme.spacing(3),
        backgroundColor:"white",
        '& .MuiFormControl-root': {

            width: '70%',
            padding:theme.spacing(1),
            margin: theme.spacing(1),
            // border: '1px solid grey',
            // alignItems:'center',
            borderRadius: '4px',
            backgroundColor: 'white'

        }
    },
    pageContent: {

        padding: theme.spacing(3)
    },

}))

const UpdateCandidate = ({history}) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const location = useLocation();
    let userId=location.state.id
    const [errors,setErrors]=useState({})
    const {id}=useParams();
    const {loading,error:updateError,isUpdated}=useSelector(state =>state.updateCandidate)
    const {candidate,error}=useSelector(state=>state.candidateDetails)
    const alert=useAlert();
    const [Candidate, setCandidate] = useState({
        firstname: candidate.firstname,
        lastname: candidate.lastname,
        email: candidate.email,
        password:candidate.password,
        phone: candidate.phone,
        mobile: candidate.mobile,
        country: candidate.country,
        city: candidate.city,
        birthdate: candidate.birthdate,
        status_marital: candidate.status_marital,
        nationality: candidate.nationality,
        language: candidate.language,
        status_candidate: candidate.status_candidate,
        interview_done: candidate.interview_done,
        status_info: candidate.status_info,
        mission_type: candidate.mission_type,
        sector: candidate.sector,
        skype: candidate.skype,
        website: candidate.website,
        postal_code: candidate.postal_code,
        canton: candidate.canton,
        street: candidate.street,
        car_license: candidate.car_license,
        personal_car: candidate.personal_car,
        boat_license: candidate.boat_license,
        work_permit: candidate.work_permit,
        experience: candidate.experience,
        main_function: candidate.main_function,
        functions: candidate.functions,
        living2: candidate.living2,
        couple: candidate.couple,
        spouse_name: candidate.spouse_name,
        working_place: candidate.working_place,
        activity_rate: candidate.activity_rate,
        working_days: candidate.working_days,
        animal: candidate.animal,
        smoker: candidate.smoker,
        travel: candidate.travel,
        vaccine: candidate.vaccine,
        salary_chf: candidate.salary_chf,
        salary_other: candidate.salary_other,
        salary_13: candidate.salary_13,
        salary_hour: candidate.salary_hour,
        certificate: candidate.certificate,
        feedback_ref: candidate.feedback_ref,
        feedback_interview: candidate.feedback_interview,
        infos: candidate.infos,


    });
    const candidateId=id

    const { firstname, lastname, email,password, phone, mobile, country, city, birthdate, status_marital, nationality, language
        , status_candidate, interview_done, status_info, mission_type, sector, skype, website,
        postal_code, canton, street, car_license, personal_car, boat_license, work_permit, experience,
        main_function, functions, living2, couple, spouse_name, working_place, activity_rate, working_days,
        animal, smoker, travel, vaccine, salary_chf, salary_other, salary_13, salary_hour, certificate,
        feedback_ref, feedback_interview, infos
    } = Candidate

    const candidateSubmitHandler = (e) => {
        e.preventDefault();
        if(strictValidObjectWithKeys(validate(Candidate))) setErrors(validate(Candidate))
        else dispatch(updateCandidate(candidateId,Candidate));
    };

    const updateCandidateChange = (e) => {
        setCandidate({ ...Candidate, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        if(Candidate && Candidate._id !== userId){
            dispatch(getCandidateDetails(userId))
            }
        if(updateError){
            alert.error(updateError)
            dispatch(clearErrors());
        }
        if(isUpdated){
            alert.success('Candidate Updated Successfully!');
            history.push("/candidates")
            dispatch({
                type:UPDATE_CANDIDATE_RESET
            })
        }
    }, [updateError,dispatch,alert,isUpdated,alert,candidateId])
    return (

        <div className='createCandidateContainer'>

            <form encType='multipart/form-data' className={classes.candidate_root} onSubmit={candidateSubmitHandler}>
                <Typography className='section1'>Infos Status Recruitment</Typography>
                <Paper className={classes.pageContent} >
                    <Grid container direction="row"
                        justifyContent="center"
                        alignItems="center">

                        <Grid item xs={12} md={6}>
                        <FormControl error={errors.status_candidate ? true : false}>
                                <InputLabel id="demo-simple-select-error-label">Candidate Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    label="Candidate Status"
                                    
                                    name='status_candidate'
                                    value={status_candidate}
                                    onChange={updateCandidateChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                {errors.status_candidate &&
                                <FormHelperText>{errors.status_candidate}</FormHelperText>
                                }
                            </FormControl>


                            <FormControl error={errors.interview_done ? true :false} >
                                <InputLabel id="demo-simple-select-error-label">Interview done</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    label="Interview done"
                                    name='interview_done'
                                    value={interview_done}
                                    onChange={updateCandidateChange}
                                >
                                    
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { errors.interview_done &&
                                <FormHelperText>{errors.interview_done}</FormHelperText>
                                }
                                </FormControl>
                            
                                <FormControl error={errors.status_info ? true :false}>
                                <InputLabel id="demo-simple-select-error-label">Info Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    label="Info Status"
                                    name='status_info'
                                    value={status_info}
                                    onChange={updateCandidateChange}
                                >
                                    
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { errors.interview_done &&
                                <FormHelperText>{errors.interview_done}</FormHelperText>
                                }
                            </FormControl>
                            

                            {/* <TextField variant="standard" label="Info Status" name="status_info" value={status_info} onChange={newCandidateChange} /> */}

                            
                        </Grid>
                        <Grid item xs={12} md={6}>

                        <FormControl error={errors.mission_type ? true :false}>
                                <InputLabel id="demo-simple-select-error-label">Mission Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    label="Mission Type"
                                    name='mission_type'
                                    value={mission_type}
                                    onChange={updateCandidateChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { errors.mission_type &&
                                <FormHelperText>{errors.mission_type}</FormHelperText>
                                }
                            </FormControl>

                            <FormControl error={errors.sector ? true :false }>
                                <InputLabel id="demo-simple-select-error-label">Sector</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    label="Sector"
                                    name='sector'
                                    value={sector}
                                    onChange={updateCandidateChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { errors.sector &&
                                <FormHelperText>{errors.sector}</FormHelperText>
                                }
                            </FormControl>
                        </Grid>
                    </Grid>
                </Paper>

                <Typography className='section1'>Information Contact</Typography>
                <Paper className={classes.pageContent}>
                    <Grid container>
                    <Grid item xs={12} md={6}>
                            <TextField variant="standard" label="First Name" error={errors.firstname ? true : false} helperText={errors.firstname && errors.firstname} name="firstname" value={firstname} onChange={updateCandidateChange} />
                            <TextField variant="standard" label="Last Name"  name="lastname" value={lastname} error={errors.lastname ? true : false} helperText={errors.lastname && errors.lastname} onChange={updateCandidateChange} />
                            <TextField type="password" variant="standard" label="Password" name="password" value={password} error={errors.password ? true : false} helperText={errors.password && errors.password} onChange={updateCandidateChange} />
                            <TextField type="number" variant="standard" label="Phone Number" name="phone" value={phone} error={errors.phone ? true : false} helperText={errors.phone && errors.phone} onChange={updateCandidateChange} />
                            <TextField type="number" variant="standard" label="Mobile Number" name="mobile" value={mobile} error={errors.mobile ? true : false} helperText={errors.mobile && errors.mobile} onChange={updateCandidateChange} />
                            <TextField type="email" variant="standard" label="Email" name="email" value={email} error={errors.email ? true : false} helperText={errors.email && errors.email} onChange={updateCandidateChange} />
                            <TextField variant="standard" label="Country" name="country" value={country} error={errors.country ? true : false} helperText={errors.country && errors.country} onChange={updateCandidateChange} />
                            <TextField variant="standard" label="City" name="city" value={city} error={errors.city ? true : false} helperText={errors.city && errors.city} onChange={updateCandidateChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField variant="standard" label="Skype ID" name="skype" value={skype} error={errors.skype ? true : false} helperText={errors.skype && errors.skype} onChange={updateCandidateChange} />
                            <TextField variant="standard" label="Website/Social" name="website" value={website} error={errors.website ? true : false} helperText={errors.website && errors.website} onChange={updateCandidateChange} />
                            <TextField variant="standard" label="Canton(Swiss)" name="canton" value={canton} error={errors.canton ? true : false} helperText={errors.canton && errors.canton} onChange={updateCandidateChange} />
                            <TextField type="number" variant="standard" label="Postal Code" name="postal_code" value={postal_code} error={errors.postal_code ? true : false} helperText={errors.postal_code && errors.postal_code} onChange={updateCandidateChange} />
                            <TextField variant="standard" label="Street" name="street" value={street}  error={errors.street ? true : false} helperText={errors.street && errors.street} onChange={updateCandidateChange} />
                        </Grid>
                    </Grid>
                </Paper>

                <Typography className='section1'>Information de base</Typography>
                <Paper className={classes.pageContent}>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                        <FormControl error={errors.work_permit ? true :false }>
                                <InputLabel id="demo-simple-select-error-label">Working License</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    label="Working License"
                                    name='work_permit'
                                    value={work_permit}
                                    onChange={updateCandidateChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { errors.work_permit &&
                                <FormHelperText>{errors.work_permit}</FormHelperText>
                                }
                            </FormControl>
                            <FormControl error={errors.language ? true :false }>
                                <InputLabel id="demo-simple-select-error-label">Language</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    label="Language"
                                    name='language'
                                    value={language}
                                    onChange={updateCandidateChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { errors.language &&
                                <FormHelperText>{errors.language}</FormHelperText>
                                }
                            </FormControl>

                            <TextField variant="standard" type="date" label="Birthdate" name="birthdate" value={birthdate} error={errors.birthdate ? true : false} helperText={errors.birthdate && errors.birthdate}  onChange={updateCandidateChange} />

                            <FormControl error={errors.vaccine ? true :false }>
                                <InputLabel id="demo-simple-select-error-label">COVID Vaccine</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    label="Vaccine"
                                    name='vaccine'
                                    value={vaccine}
                                    onChange={updateCandidateChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { errors.vaccine &&
                                <FormHelperText>{errors.vaccine}</FormHelperText>
                                }
                            </FormControl>

                            <FormControl error={errors.status_marital ? true :false }>
                                <InputLabel id="demo-simple-select-error-label">Marital Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    name='status_marital'
                                    value={status_marital}
                                    onChange={updateCandidateChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { errors.status_marital &&
                                <FormHelperText>{errors.status_marital}</FormHelperText>
                                }
                            </FormControl>

                            <TextField variant="standard" label="Nationality" name="nationality" value={nationality} error={errors.nationality ? true : false} helperText={errors.nationality && errors.nationality} onChange={updateCandidateChange} />
                            
                            </Grid>
                        <Grid item xs={12} md={6}>
                        <FormControl error={errors.smoker ? true :false }>
                                <InputLabel id="demo-simple-select-error-label">Smoker</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    name='smoker'
                                    value={smoker}
                                    onChange={updateCandidateChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { errors.smoker &&
                                <FormHelperText>{errors.smoker}</FormHelperText>
                                }
                            </FormControl>
                            <FormControl error={errors.car_license ? true :false }>
                                <InputLabel id="demo-simple-select-error-label">Car License</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    name='car_license'
                                    value={car_license}
                                    onChange={updateCandidateChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { errors.car_license &&
                                <FormHelperText>{errors.car_license}</FormHelperText>
                                }
                            </FormControl>
                            <FormControl error={errors.personal_car ? true :false }>
                                <InputLabel id="demo-simple-select-error-label">Personal Car</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    name='personal_car'
                                    value={personal_car}
                                    onChange={updateCandidateChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { errors.personal_car &&
                                <FormHelperText>{errors.personal_car}</FormHelperText>
                                }
                            </FormControl>
                            <FormControl error={errors.boat_license ? true :false }>
                                <InputLabel id="demo-simple-select-error-label">Boat License</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    name='boat_license'
                                    value={boat_license}
                                    onChange={updateCandidateChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { errors.boat_license &&
                                <FormHelperText>{errors.boat_license}</FormHelperText>
                                }
                            </FormControl>


                        </Grid>
                    </Grid>
                </Paper >
                <Typography className='section1'>Information Interview</Typography>
                <Paper className={classes.pageContent}>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                        <FormControl error={errors.main_function ? true :false }>
                                <InputLabel id="demo-simple-select-error-label">Main Function</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    name='main_function'
                                    value={main_function}
                                    onChange={updateCandidateChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { errors.main_function &&
                                <FormHelperText>{errors.main_function}</FormHelperText>
                                }
                            </FormControl>
                            <FormControl error={errors.functions ? true :false }>
                                <InputLabel id="demo-simple-select-error-label">Functions</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    name='functions'
                                    value={functions}
                                    onChange={updateCandidateChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { errors.functions &&
                                <FormHelperText>{errors.functions}</FormHelperText>
                                }
                            </FormControl>
                            <FormControl error={errors.experience ? true :false }>
                                <InputLabel id="demo-simple-select-error-label">Experience(min 3yrs)</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    name='experience'
                                    value={experience}
                                    onChange={updateCandidateChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { errors.experience &&
                                <FormHelperText>{errors.experience}</FormHelperText>
                                }
                            </FormControl>
                            <FormControl error={errors.working_place ? true :false }>
                                <InputLabel id="demo-simple-select-error-label">Working place</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    name='working_place'
                                    value={working_place}
                                    onChange={updateCandidateChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { errors.experience &&
                                <FormHelperText>{errors.experience}</FormHelperText>
                                }
                            
                            </FormControl>
                            <TextField variant="standard" label='Activity Rate' type="number" name="activity_rate" value={activity_rate}  error={errors.activity_rate ? true : false} helperText={errors.activity_rate && errors.activity_rate} onChange={updateCandidateChange} />
                            
                            <FormControl error={errors.travel ? true :false }>
                                <InputLabel id="demo-simple-select-error-label">Travel</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    name='travel'
                                    value={travel}
                                    onChange={updateCandidateChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { errors.travel &&
                                <FormHelperText>{errors.travel}</FormHelperText>
                                }
                            </FormControl>
                            <FormControl error={errors.living2 ? true :false }>
                                <InputLabel id="demo-simple-select-error-label">Living</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    name='living2'
                                    value={living2}
                                    onChange={updateCandidateChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { errors.living2 &&
                                <FormHelperText>{errors.living2}</FormHelperText>
                                }
                            </FormControl>
                            <FormControl error={errors.couple ? true :false }>
                                <InputLabel id="demo-simple-select-error-label">Couple</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    name='couple'
                                    value={couple}
                                    onChange={updateCandidateChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { errors.couple &&
                                <FormHelperText>{errors.couple}</FormHelperText>
                                }
                            </FormControl>
                            <TextField variant="standard" label='Spouse Name' name="spouse_name" value={spouse_name}  error={errors.spouse_name ? true : false} helperText={errors.spouse_name && errors.spouse_name} onChange={updateCandidateChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <FormControl error={errors.animal ? true :false }>
                                <InputLabel id="demo-simple-select-error-label">Animal</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    name='animal'
                                    value={animal}
                                    onChange={updateCandidateChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { errors.animal &&
                                <FormHelperText>{errors.animal}</FormHelperText>
                                }
                            </FormControl>
                            <FormControl error={errors.working_days ? true :false }>
                                <InputLabel id="demo-simple-select-error-label">Working Days</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    name='working_days'
                                    value={working_days}
                                    onChange={updateCandidateChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { errors.working_days &&
                                <FormHelperText>{errors.working_days}</FormHelperText>
                                }
                            </FormControl>
                            <TextField variant="standard" type="number"  label='Desired Salary' name="salary_chf" value={salary_chf}  error={errors.salary_chf ? true : false} helperText={errors.salary_chf && errors.salary_chf} onChange={updateCandidateChange} />
                            <TextField variant="standard" type="number"  label='Other Salary' name="salary_other" value={salary_other}  error={errors.salary_other ? true : false} helperText={errors.salary_other && errors.salary_other} onChange={updateCandidateChange} />
                            <TextField variant="standard" type="number"  label='13th Salary' name="salary_13" value={salary_13}  error={errors.salary_13 ? true : false} helperText={errors.salary_13 && errors.salary_13} onChange={updateCandidateChange} />
                            <TextField variant="standard" type="number"  label='Hourly Wage' name="salary_hour" value={salary_hour}  error={errors.salary_hour ? true : false} helperText={errors.salary_hour && errors.salary_hour} onChange={updateCandidateChange} />
                            <TextField variant="standard"  label='Interview Feedback' name="feedback_interview" value={feedback_interview}  error={errors.feedback_interview ? true : false} helperText={errors.feedback_interview && errors.feedback_interview} onChange={updateCandidateChange} />
                            <TextField variant="standard"  label='Reference Feedback' name="feedback_ref" value={feedback_ref}  error={errors.feedback_ref ? true : false} helperText={errors.feedback_ref && errors.feedback_ref} onChange={updateCandidateChange} />
                            <TextField variant="standard"  label='Certification/Education' name="certificate" value={certificate}  error={errors.certificate ? true : false} helperText={errors.certificate && errors.certificate} onChange={updateCandidateChange} />
                            <TextField variant="standard"  label='More Infos' name="infos" value={infos}  error={errors.infos ? true : false} helperText={errors.infos && errors.infos} onChange={updateCandidateChange} />

                        </Grid>
                    </Grid>
                    <Button type="submit"  style={{backgroundColor:"rgb(21, 21, 116)" ,color:"white" ,marginTop:"2vmax"}} fullWidth variant='contained'>Update Candidate</Button>
                </Paper>
            </form>
        </div>

    )
}

export default UpdateCandidate;
