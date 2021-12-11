const express=require("express");
const { getAllCalanders, createCalander, getCalander, updateCalander, deleteCalender } = require("../controllers/calender-controller");
const { isAuthenticatedUser, AuthorizeRoles } = require("../middlewares/auth");
const CalendarRouter=express.Router();

let allowedRoles = AuthorizeRoles("admin","superadmin")
CalendarRouter.route("/")
.get(isAuthenticatedUser,allowedRoles,getAllCalanders)
.post(isAuthenticatedUser,AuthorizeRoles("candidate"),createCalander)

CalendarRouter.route('/:calendarId')
.get(isAuthenticatedUser,AuthorizeRoles("admin","superadmin","candidate"),getCalander)
.put(isAuthenticatedUser,allowedRoles,updateCalander)
.delete(isAuthenticatedUser,allowedRoles,deleteCalender)
module.exports=CalendarRouter;