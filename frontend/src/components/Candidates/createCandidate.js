import { Typography } from '@mui/material'
import "./createCandidate.css"
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {createCandidate} from "./actions"

const CreateCandidate = () => {
    const dispatch = useDispatch();
    const [candidate,setCandidate]=useState({
        firstname:"",
        lastname:"",
        email:"",
        password:"",
        phone:"",
        mobile:"",
        country:"",
        city:"",
        birthdate:"",
        status_marital:"",
        nationality:"",
        language:"",
        status_candidate:"",
        interview_done:"",
        status_info:"",
        mission_type:"",
        sector:"",
        skype:"",
        website:"",
        postal_code:"",
        canton:"",
        street:"",
        car_license:"",
        personal_car:"",
        boat_license:"",
        work_permit:"",
        experience:"",
        main_function:"",
        functions:"",
        living2:"",
        couple:"",
        spouse_name:"",
        working_place:"",
        activity_rate:"",
        working_days:"",
        animal:"",
        smoker:"",
        travel:"",
        vaccine:"",
        salary_chf:"",
        salary_other:"",
        salary_13:"",
        salary_hour:"",
        certificate:"",
        feedback_ref:"",
        feedback_interview:"",
        infos:"",
        remark:"",

    });

    const {firstname,lastname,email,password,phone,mobile,country,city,birthdate,status_marital,nationality,language
        ,status_candidate,interview_done,status_info,mission_type,sector,skype,website,
        postal_code,canton,street,car_license,personal_car,boat_license,work_permit,experience,
        main_function,functions,living2,couple,spouse_name,working_place,activity_rate,working_days,
    animal,smoker,travel,vaccine,salary_chf,salary_other,salary_13,salary_hour,certificate,
    feedback_ref,feedback_interview,infos,remark
    }=candidate

    const submitHandler=(e)=>{
        e.preventDefault();
        const candidateForm=new FormData();

        candidateForm.set("firstname",firstname);
        candidateForm.set("lastname",lastname);
        candidateForm.set("email",email);
        candidateForm.set("password",password);
        candidateForm.set("phone",phone);
        candidateForm.set("mobile",mobile);
        candidateForm.set("country",country);
        candidateForm.set("city",city);
        candidateForm.set("birthdate",birthdate);
        candidateForm.set("status_marital",status_marital);
        candidateForm.set("nationality",nationality);
        candidateForm.set("language",language);
        candidateForm.set("status_candidate",status_candidate);
        candidateForm.set("interview_done",interview_done);
        candidateForm.set("status_info",status_info);
        candidateForm.set("mission_type",mission_type);
        candidateForm.set("sector",sector);
        candidateForm.set("skype",skype);
        candidateForm.set("website",website);
        candidateForm.set("postal-code",postal_code);
        candidateForm.set("canton",canton);
        candidateForm.set("street",street);
        candidateForm.set("car_license",car_license);
        candidateForm.set("work_permit",work_permit);
        candidateForm.set("personal_car",personal_car);
        candidateForm.set("boat_license",boat_license);
        candidateForm.set("experience",experience);
        candidateForm.set("main_function",main_function);
        candidateForm.set("functions",functions);
        candidateForm.set("living2",living2);
        candidateForm.set("couple",couple);
        candidateForm.set("spouse_name",spouse_name);
        candidateForm.set("working_place",working_place);
        candidateForm.set("activity_rate",activity_rate);
        candidateForm.set("working_days",working_days);
        candidateForm.set("animal",animal);
        candidateForm.set("smoker",smoker)
        candidateForm.set("travel",travel)
        candidateForm.set("vaccine",vaccine);
        candidateForm.set("salary_chf",salary_chf);
        candidateForm.set("salary_other",salary_other);
        candidateForm.set("salary_13",salary_13);
        candidateForm.set("salary_hour",salary_hour);
        candidateForm.set("certificate",certificate);
        candidateForm.set("feedback_interview",feedback_interview);
        candidateForm.set("feedback_ref",feedback_ref);
        candidateForm.set("infos",infos);
        candidateForm.set("remark",remark);

        dispatch(createCandidate(candidateForm));

    };

    const newCandidateChange=(e)=>{
        setCandidate({...candidate, [e.target.name]: e.target.value})
    }

    return (
        <div className='createCandidateContainer'>
            <div className='top-bar'>

            </div>
            <form encType='multipart/form-data' onSubmit={submitHandler}>
                <div className='upper-section'>

                    <Typography>Infos Status Recruitment</Typography>
                    <div className='data'>
                        <div className='section'>
                            <div>
                                <label>Candidate Status</label>
                                <select name='status_candidate' onChange={newCandidateChange}>
                                    <option value=""> </option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                            </div>
                            <div>
                                <label>Interview done</label>
                                <select name='interview_done' onChange={newCandidateChange}>
                                    <option value=""> </option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                            </div>
                            <div>
                                <label>Info Status</label>
                                <input type="text" name='status_info' value={status_info} onChange={newCandidateChange} />
                            </div>
                            <div>
                                <label>Mission Type</label>
                                <select name='mission_type' onChange={newCandidateChange}>
                                    <option value=""></option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                            </div>
                            <div>
                                <label>Sector</label>
                                <select name='sector' onChange={newCandidateChange}>
                                <option>.</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                            </div>

                        </div>
                        <div className='section'>
                            <div>
                                <label>Created Date</label>
                                <input type="date" />
                            </div>
                            <div>
                                <label>Reference Status</label>
                                <select name=''>
                                <option>.</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                            </div>
                            <div>
                                <label>Source</label>
                                <select>
                                <option>.</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                            </div>
                            <div>
                                <label>Manager</label>
                                <select>
                                <option>.</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='middle-section'>

                    <Typography>Information Contact</Typography>
                    <div className='data'>
                        <div className='section'>
                            <div>
                                <label>First Name</label>
                                <input type="text" required placeholder='First Name' name='firstname' value={firstname} onChange={newCandidateChange} />
                            </div>
                            <div>
                                <label>Last Name</label>
                                <input type="text" required placeholder='Last Name' name='lastname' value={lastname} onChange={newCandidateChange} />
                            </div>
                            <div>
                                <label>Phone</label>
                                <input type="number" placeholder='Phone Number' name="phone" value={phone} onChange={newCandidateChange} />
                            </div>
                            <div>
                                <label>Mobile</label>
                                <input type="number" placeholder='Mobile Number' name="mobile" value={mobile} onChange={newCandidateChange}/>
                            </div>
                            <div>
                                <label>Email</label>
                                <input type="email" required placeholder='Email' name="email" value={email} onChange={newCandidateChange}/>
                            </div>
                            <div>
                                <label>Country</label>
                                <input type="text" />
                            </div>
                            <div>
                                <label>City</label>
                                <input type="text" />
                            </div>
                            
                        </div>
                        <div className='section'>
                            <div>
                                <label>Skype ID</label>
                                <input type="text" name="skype" value={skype} onChange={newCandidateChange} />
                            </div>
                            <div>
                                <label>Website/Social</label>
                                <input type="text" name="website" value={website} onChange={newCandidateChange}/>
                            </div>
                            <div>
                                <label>Canton(Swiss)</label>
                                <input type="text" name="canton" value={canton} onChange={newCandidateChange}/>
                            </div>
                            <div>
                                <label>Postal Code</label>
                                <input type="number" name="postal_code" value={postal_code} onChange={newCandidateChange}/>
                            </div>
                            <div>
                                <label>Street</label>
                                <input type="text" name='street' value={street} onChange={newCandidateChange}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='middle-section'>
                    <Typography>Information de base</Typography>
                    <div className='data'>
                        <div className='section'>
                            <div>
                                <label>Working License</label>
                                <select name='work_permit' onChange={newCandidateChange}>
                                <option>.</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                    </select>
                            </div>
                            <div>
                                <label>Language</label>
                                <select name='language' onChange={newCandidateChange}>
                                <option>.</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                            </div>
                            <div>
                                <label>Birthdate</label>
                                <input type="datetime-local" name='birthdate' value={birthdate} onChange={newCandidateChange} />
                            </div>
                            <div>
                                <label>COVID Vaccine</label>
                                <select name="vaccine" onChange={newCandidateChange}>
                                <option>.</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                            </select>
                            </div>
                            <div>
                                <label>Marital Status</label>
                                <select>
                                <option>.</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                            </select>
                            </div>
                            <div>
                                <label>Origin</label>
                                <input type="text" />
                            </div>
                            <div>
                                <label>Nationality</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className='section'>
                            <div>
                                <label>Smoker</label>
                                <select name='smoker' onChange={newCandidateChange}>
                                <option>.</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                            </select>
                            </div>
                            <div>
                                <label>License</label>
                                <select name='car_license' onChange={newCandidateChange}>
                                <option>.</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                            </select>
                            </div>
                            <div>
                                <label>Personal Car</label>
                                <select name='personal_car' onChange={newCandidateChange}>
                                <option>.</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                            </select>
                            </div>
                            <div>
                                <label>Airplane License</label>
                                <select >
                                <option>.</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                            </select>
                            </div>
                            <div>
                                <label>Boat License</label>
                                <select name='boat_license' onChange={newCandidateChange}>
                                <option value="">.</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                            </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bottom-section'>
                    <Typography>Information Interview</Typography>
                    <div className='data'>
                        <div className='section'>
                            <div>
                                <label>Main Function</label>
                                <select name='main_function' onChange={newCandidateChange}>
                                <option value="">.</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                            </select>
                            </div>
                            <div>
                                <label>Functions</label>
                                <select name='functions' onChange={newCandidateChange}>
                                <option value="">.</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                            </select>
                            </div>
                            <div>
                                <label>Techniques</label>
                                <input type="text" />
                            </div>
                            <div>
                                <label>Experience(min 3 yrs)</label>
                                <select name='experience' onChange={newCandidateChange}>
                                <option>.</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                            </select>
                            </div>
                            <div>
                                <label>Working place</label>
                                <select name='working_place' onChange={newCandidateChange}>
                                <option>.</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                            </select>
                            </div>
                            <div>
                                <label>Activity rate</label>
                                <input type="number" name="activity_rate" value={activity_rate} onChange={newCandidateChange}/>
                            </div>
                            <div>
                                <label>Travel(2)</label>
                                <select>
                                <option>.</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                            </select>
                            </div>
                            <div>
                                <label>Travel</label>
                                <input type="text" />
                            </div>
                            <div>
                                <label>Living (2)</label>
                                <select>
                                <option>.</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </select>
                            </div>
                            <div>
                                <label>Living</label>
                                <input type="text" />
                            </div>
                            <div>
                                <label>Couple</label>
                                <select name='couple' onChange={newCandidateChange}>
                                <option>.</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                            </select>
                            </div>
                            <div>
                                <label>Spouse Name</label>
                                <input type="text" name='spouse_name' value={spouse_name} onChange={newCandidateChange} />
                            </div>
                        </div>
                        <div className='section'>
                            <div>
                                <label>Animal</label>
                                <select name='animal' onChange={newCandidateChange}>
                                <option>.</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                            </select>
                            </div>
                            <div>
                                <label>Working Days</label>
                                <select>
                                <option>.</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                            </select>
                            </div>
                            <div>
                                <label>Desired Salary</label>
                                <input type="number" name='salary_chf' value={salary_chf} onChange={newCandidateChange}/>
                            </div>
                            <div>
                                <label>other currency</label>
                                <input type="number" name='salary_other' value={salary_other} onChange={newCandidateChange}/>
                            </div>
                            <div>
                                <label>13th salary</label>
                                <input type="number" name='salary_13' value={salary_13} onChange={newCandidateChange}/>
                            </div>
                            <div>
                                <label>Hourly wage</label>
                                <input type="number" name='salary_hour' value={salary_hour} onChange={newCandidateChange}/>
                            </div>
                            <div>
                                <label>Interview Feedback</label>
                                <input type="text" name='feedback_interview' value={feedback_interview} onChange={newCandidateChange}/>
                            </div>
                            <div>
                                <label>Reference Feedback</label>
                                <input type="text" name='feedback_ref' value={feedback_ref} onChange={newCandidateChange}/>
                            </div>
                            <div>
                                <label>Certificate/Education</label>
                                <input type="text" name='certificate' value={certificate} onChange={newCandidateChange}/>
                            </div>
                            <div>
                                <label>Mor Infos</label>
                                <input type="text" name='infos' value={infos} onChange={newCandidateChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateCandidate;