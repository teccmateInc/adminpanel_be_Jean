import { Box, Grid, TextField, Typography } from '@mui/material'
import { makeStyles, Paper, Select, MenuItem, InputLabel, FormControl, Button,FormHelperText } from '@material-ui/core'
import React, { useState,useEffect } from 'react'
import './form.css'
import { useDispatch,useSelector } from 'react-redux'
import SelectBox from './select';
import { clearErrors, createCandidate } from './actions';
import {useAlert} from 'react-alert'
import { CREATE_CANDIDATE_RESET } from './constants'
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

const Form = ({history}) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [errors,setErrors]=useState({});
    const {loading,success,error} =useSelector(state=>state.createCandidate)
    const alert=useAlert();
    const [candidate, setCandidate] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password:"",
        phone: "",
        mobile: "",
        country: "",
        city: "",
        birthdate: "",
        status_marital: "",
        nationality: "",
        language: "",
        status_candidate: "",
        interview_done: "",
        status_info: "",
        mission_type: "",
        sector: "",
        skype: "",
        website: "",
        postal_code: "",
        canton: "",
        street: "",
        car_license: "",
        personal_car: "",
        boat_license: "",
        work_permit: "",
        experience: "",
        main_function: "",
        functions: "",
        living2: "",
        couple: "",
        spouse_name: "",
        working_place: "",
        activity_rate: "",
        working_days: "",
        animal: "",
        smoker: "",
        travel: "",
        vaccine: "",
        salary_chf: "",
        salary_other: "",
        salary_13: "",
        salary_hour: "",
        certificate: "",
        feedback_ref: "",
        feedback_interview: "",
        infos: "",


    });

    const { firstname, lastname, email,password, phone, mobile, country, city, birthdate, status_marital, nationality, language
        , status_candidate, interview_done, status_info, mission_type, sector, skype, website,
        postal_code, canton, street, car_license, personal_car, boat_license, work_permit, experience,
        main_function, functions, living2, couple, spouse_name, working_place, activity_rate, working_days,
        animal, smoker, travel, vaccine, salary_chf, salary_other, salary_13, salary_hour, certificate,
        feedback_ref, feedback_interview, infos
    } = candidate

    const submitHandler = (e) => {
        e.preventDefault();
        if(strictValidObjectWithKeys(validate(candidate))) setErrors(validate(candidate))
        else dispatch(createCandidate(candidate));
    };

    const newCandidateChange = (e) => {
        setCandidate({ ...candidate, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors());
        }
        if(success){
            alert.success('Candidate created Successfully!');
            history.push("/candidates")
            dispatch({
                type:CREATE_CANDIDATE_RESET
            })
        }
    }, [error,dispatch,alert,success])
    return (

        <div className='createCandidateContainer'>

            <form encType='multipart/form-data' className={classes.candidate_root} onSubmit={submitHandler}>
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
                                    onChange={newCandidateChange}
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
                                    onChange={newCandidateChange}
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
                                    onChange={newCandidateChange}
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
                                    onChange={newCandidateChange}
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
                                    onChange={newCandidateChange}
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
                            <TextField variant="standard" label="First Name" error={errors.firstname ? true : false} helperText={errors.firstname && errors.firstname} name="firstname" value={firstname} onChange={newCandidateChange} />
                            <TextField variant="standard" label="Last Name"  name="lastname" value={lastname} error={errors.lastname ? true : false} helperText={errors.lastname && errors.lastname} onChange={newCandidateChange} />
                            <TextField type="password" variant="standard" label="Password" name="password" value={password} error={errors.password ? true : false} helperText={errors.password && errors.password} onChange={newCandidateChange} />
                            <TextField type="number" variant="standard" label="Phone Number" name="phone" value={phone} error={errors.phone ? true : false} helperText={errors.phone && errors.phone} onChange={newCandidateChange} />
                            <TextField type="number" variant="standard" label="Mobile Number" name="mobile" value={mobile} error={errors.mobile ? true : false} helperText={errors.mobile && errors.mobile} onChange={newCandidateChange} />
                            <TextField type="email" variant="standard" label="Email" name="email" value={email} error={errors.email ? true : false} helperText={errors.email && errors.email} onChange={newCandidateChange} />
                            <TextField variant="standard" label="Country" name="country" value={country} error={errors.country ? true : false} helperText={errors.country && errors.country} onChange={newCandidateChange} />
                            <TextField variant="standard" label="City" name="city" value={city} error={errors.city ? true : false} helperText={errors.city && errors.city} onChange={newCandidateChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField variant="standard" label="Skype ID" name="skype" value={skype} error={errors.skype ? true : false} helperText={errors.skype && errors.skype} onChange={newCandidateChange} />
                            <TextField variant="standard" label="Website/Social" name="website" value={website} error={errors.website ? true : false} helperText={errors.website && errors.website} onChange={newCandidateChange} />
                            <TextField variant="standard" label="Canton(Swiss)" name="canton" value={canton} error={errors.canton ? true : false} helperText={errors.canton && errors.canton} onChange={newCandidateChange} />
                            <TextField type="number" variant="standard" label="Postal Code" name="postal_code" value={postal_code} error={errors.postal_code ? true : false} helperText={errors.postal_code && errors.postal_code} onChange={newCandidateChange} />
                            <TextField variant="standard" label="Street" name="street" value={street}  error={errors.street ? true : false} helperText={errors.street && errors.street} onChange={newCandidateChange} />
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
                                    onChange={newCandidateChange}
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
                                    onChange={newCandidateChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { errors.language &&
                                <FormHelperText>{errors.language}</FormHelperText>
                                }
                            </FormControl>
                            
                            <TextField variant="standard" type="date" label="Birthdate" name="birthdate" value={birthdate} error={errors.birthdate ? true : false} helperText={errors.birthdate && errors.birthdate}  onChange={newCandidateChange} />


                            <FormControl error={errors.vaccine ? true :false }>
                                <InputLabel id="demo-simple-select-error-label">COVID Vaccine</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    label="Vaccine"
                                    name='vaccine'
                                    value={vaccine}
                                    onChange={newCandidateChange}
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
                                    onChange={newCandidateChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { errors.status_marital &&
                                <FormHelperText>{errors.status_marital}</FormHelperText>
                                }
                            </FormControl>

                            {/* <TextField variant="standard" label="origin" name="origin" value="" onChange={newCandidateChange} /> */}
                            <TextField variant="standard" label="Nationality" name="nationality" value={nationality} error={errors.nationality ? true : false} helperText={errors.nationality && errors.nationality} onChange={newCandidateChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl error={errors.smoker ? true :false }>
                                <InputLabel id="demo-simple-select-error-label">Smoker</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    name='smoker'
                                    value={smoker}
                                    onChange={newCandidateChange}
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
                                    onChange={newCandidateChange}
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
                                    onChange={newCandidateChange}
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
                                    onChange={newCandidateChange}
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
                                    onChange={newCandidateChange}
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
                                    onChange={newCandidateChange}
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
                                    onChange={newCandidateChange}
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
                                    onChange={newCandidateChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { errors.experience &&
                                <FormHelperText>{errors.experience}</FormHelperText>
                                }
                            </FormControl>
                            <TextField variant="standard" label='Activity Rate' type="number" name="activity_rate" value={activity_rate}  error={errors.activity_rate ? true : false} helperText={errors.activity_rate && errors.activity_rate} onChange={newCandidateChange} />
                            <FormControl error={errors.travel ? true :false }>
                                <InputLabel id="demo-simple-select-error-label">Travel</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    name='travel'
                                    value={travel}
                                    onChange={newCandidateChange}
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
                                    onChange={newCandidateChange}
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
                                    onChange={newCandidateChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { errors.couple &&
                                <FormHelperText>{errors.couple}</FormHelperText>
                                }
                            </FormControl>
                            
                            <TextField variant="standard" label='Spouse Name' name="spouse_name" value={spouse_name}  error={errors.spouse_name ? true : false} helperText={errors.spouse_name && errors.spouse_name} onChange={newCandidateChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <FormControl error={errors.animal ? true :false }>
                                <InputLabel id="demo-simple-select-error-label">Animal</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    name='animal'
                                    value={animal}
                                    onChange={newCandidateChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { errors.animal &&
                                <FormHelperText>{errors.animal}</FormHelperText>
                                }
                            </FormControl>
                            {/* <SelectBox
                                label="Animal"
                                name="animal"
                                value={animal}
                                onChange={newCandidateChange}
                            /> */}
                            <FormControl error={errors.working_days ? true :false }>
                                <InputLabel id="demo-simple-select-error-label">Working Days</InputLabel>
                                <Select
                                    labelId="demo-simple-select-error-label"
                                    id="demo-simple-select-error"
                                    name='working_days'
                                    value={working_days}
                                    onChange={newCandidateChange}
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                                { errors.working_days &&
                                <FormHelperText>{errors.working_days}</FormHelperText>
                                }
                            </FormControl>
                            
                            <TextField variant="standard" type="number"  label='Desired Salary' name="salary_chf" value={salary_chf}  error={errors.salary_chf ? true : false} helperText={errors.salary_chf && errors.salary_chf} onChange={newCandidateChange} />
                            <TextField variant="standard" type="number"  label='Other Salary' name="salary_other" value={salary_other}  error={errors.salary_other ? true : false} helperText={errors.salary_other && errors.salary_other} onChange={newCandidateChange} />
                            <TextField variant="standard" type="number"  label='13th Salary' name="salary_13" value={salary_13}  error={errors.salary_13 ? true : false} helperText={errors.salary_13 && errors.salary_13} onChange={newCandidateChange} />
                            <TextField variant="standard" type="number"  label='Hourly Wage' name="salary_hour" value={salary_hour}  error={errors.salary_hour ? true : false} helperText={errors.salary_hour && errors.salary_hour} onChange={newCandidateChange} />
                            <TextField variant="standard"  label='Interview Feedback' name="feedback_interview" value={feedback_interview}  error={errors.feedback_interview ? true : false} helperText={errors.feedback_interview && errors.feedback_interview} onChange={newCandidateChange} />
                            <TextField variant="standard"  label='Reference Feedback' name="feedback_ref" value={feedback_ref}  error={errors.feedback_ref ? true : false} helperText={errors.feedback_ref && errors.feedback_ref} onChange={newCandidateChange} />
                            <TextField variant="standard"  label='Certification/Education' name="certificate" value={certificate}  error={errors.certificate ? true : false} helperText={errors.certificate && errors.certificate} onChange={newCandidateChange} />
                            <TextField variant="standard"  label='More Infos' name="infos" value={infos}  error={errors.infos ? true : false} helperText={errors.infos && errors.infos} onChange={newCandidateChange} />

                        </Grid>
                    </Grid>
                    <Button type="submit"  style={{backgroundColor:"rgb(21, 21, 116)" ,color:"white" ,marginTop:"2vmax"}} fullWidth variant='contained'>Create Candidate</Button>
                </Paper>
            </form>
        </div>

    )
}

export default Form;
