import { gridDensityValueSelector } from "@mui/x-data-grid";

export default function validateInfo(admin){
   let errors={};
   if(!admin.firstname.trim()){
    errors.firstname="Firstname required"
   }
   if(!admin.lastname.trim()){
    errors.lastname="Lastname required"
   }
   if(!admin.email){
    errors.email="Email required"
   }
   else if(!/^[A-Z0-9._%+-]+@[A-Z0-9,-]+\.[A-Z]{2,}$/i.test(admin.email)){
       errors.email="Email Address is invalid"
   }
   if(!admin.password){
    errors.password="Password required"
   }
   else if(admin.password.length <8){
        errors.password="Password needs to be 8 character or more"
   }

   return errors;
}