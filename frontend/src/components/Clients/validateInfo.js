
export default function validateInfo(client){
   let errors={};
   if(!client.firstname.trim()){
    errors.firstname="Firstname required"
   }
   if(!client.lastname.trim()){
    errors.lastname="Lastname required"
   }
   if(!client.email){
    errors.email="Email required"
   }
   else if(!/^[A-Z0-9._%+-]+@[A-Z0-9,-]+\.[A-Z]{2,}$/i.test(client.email)){
       errors.email="Email Address is invalid"
   }
   if(!client.password){
    errors.password="Password required"
   }
   else if(client.password.length <8){
        errors.password="Password needs to be 8 character or more"
   }
   if(!client.address.trim()){
    errors.address="Address required"
   }
   if(!client.pa){
       errors.pa="Personal Assistant required"
   }
   if(!client.phone){
       errors.phone="Phone number required"
   }
   if(client.phone.length<10){
       errors.phone="Phone Number should greater then 10 characters or more"
   }
   if(!client.state){
    errors.state="State required"
   }
   if(!client.zip_code){
       errors.zip_code="Postal Code required"
   }
//    city:"",
//    country:"",
//    language:"",
//    vaccine:"",
   if(!client.admin_contact){
       errors.admin_contact="Admin Contact required"
   }
   if(!client.summary_demand){
       errors.summary_demand="Summary Demand required"
   }
   if(!client.title_demand){
       errors.title_demand="Title Demand required"
   }
   if(!client.send_files){
       errors.send_files="Send Files required"
   }

   return errors;
}