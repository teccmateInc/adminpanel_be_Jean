
export default function validateInfo(candidate){
   let errors={};
   if(!candidate.firstname.trim()){
    errors.firstname="Firstname required"
   }
   if(!candidate.lastname.trim()){
    errors.lastname="Lastname required"
   }
   if(!candidate.email){
    errors.email="Email required"
   }
   else if(!/^[A-Z0-9._%+-]+@[A-Z0-9,-]+\.[A-Z]{2,}$/i.test(candidate.email)){
       errors.email="Email Address is invalid"
   }
   if(!candidate.password){
    errors.password="Password required"
   }
   else if(candidate.password.length <8){
        errors.password="Password needs to be 8 character or more"
   }
   if(!candidate.phone){
       errors.phone="Phone number required"
   }
   if(candidate.phone.length<10){
       errors.phone="Phone Number should greater then 10 characters or more"
   }
   if(!candidate.mobile){
    errors.mobile="Mobile number required"
}
if(candidate.mobile.length<10){
    errors.mobile="Mobile Number should greater then 10 characters or more"
    }
    if(!candidate.canton){
        errors.canton="Canton required"
    }
   if(!candidate.postal_code){
       errors.postal_code="Postal Code required"
   }

   if(candidate.country.length === 0){
       errors.country="Country required"
   }
   if(candidate.city.length === 0){
       errors.city="City required"
   }
   if(!candidate.skype){
       errors.skype="Skype Id required"
   }
   if(candidate.sector.length === 0){
       errors.sector="Sector required"
   }
   if(!candidate.website){
    errors.website="Website required"
    }
    if(!candidate.street){
        errors.street="Street required"
    }
    if(candidate.status_candidate.length === 0){
        errors.status_candidate="Candidate status required"
    }
    if(candidate.interview_done.length === 0){
        errors.interview_done="Interview done required"
    }
    if(candidate.status_info.length === 0){
        errors.status_info="Info Status required"
    }
    if(candidate.mission_type.length === 0){
        errors.mission_type="Mission Type required"
    }
    if(candidate.work_permit.length === 0){
        errors.work_permit="Working License required"
    }
    if(candidate.language.length === 0){
        errors.language="Language required"
    }
    if(!candidate.birthdate){
        errors.birthdate="Birthdate required"
    }
    if(candidate.vaccine.length === 0){
        errors.vaccine="Vaccine required"
    }
    if(candidate.status_marital.length === 0){
        errors.status_marital="Marital Status required"
    }
    
    if(!candidate.nationality){
        errors.nationality="Nationality required"
    }
    if(candidate.smoker.length === 0){
        errors.smoker="Smoker Field required"
    }
    if(candidate.car_license.length === 0){
        errors.car_license="Car License required"
    }
    if(candidate.personal_car.length === 0){
        errors.personal_car="Personal Car required"
    }
    if(candidate.boat_license.length === 0){
        errors.boat_license="Boat License required"
    }
    if(candidate.main_function.length === 0){
        errors.main_function="Main Functions required"
    }
    if(candidate.functions.length === 0){
        errors.functions="Functions required"
    }
    if(candidate.experience.length === 0){
        errors.experience="Experience required"
    }
    if(candidate.working_place.length === 0){
       errors.working_place="Working Place required"
    }
    if(!candidate.activity_rate){
        errors.activity_rate="Activity Rate required"
    }
    if(!candidate.salary_chf){
        errors.salary_chf="Desired Salary required"
    }
    if(!candidate.salary_other){
        errors.salary_other="Other Salary required"
    }
    if(!candidate.salary_13){
        errors.salary_13="13th Salary required"
    }
    if(!candidate.salary_hour){
        errors.salary_hour="Hourly Salary required"
    }
    if(candidate.travel.length === 0){
        errors.travel="Travel required"
     }
     if(candidate.living2.length === 0){
        errors.living2="Living required"
     }
     if(candidate.couple.length === 0){
        errors.couple="Couple required"
     }
     if(!candidate.spouse_name){
        errors.spouse_name="Spouse Name required"
    }
    if(candidate.animal.length === 0){
        errors.animal="Animal required"
     }
     if(candidate.working_days.length === 0){
        errors.working_days="Working days required"
     }
     if(!candidate.certificate){
        errors.certificate="Certificate required"
    }
    if(!candidate.feedback_ref){
        errors.feedback_ref="Reference feedback required"
    }
    if(!candidate.feedback_interview){
        errors.feedback_interview="Interview feedback required"
    }
    if(!candidate.infos){
        errors.infos="More info required"
    }



   return errors;
}
