const express = require('express');
const router = express.Router;
const {
  getAllCalanders,
  createCalander,
  getCalander,
  updateCalander,
  deleteCalender,
} = require('../controllers/calender-controller');
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth');
const calendarRouter = router();

const allowedRoles = authorizeRoles('admin', 'superadmin');
calendarRouter.route('/')
    .get(isAuthenticatedUser, allowedRoles, getAllCalanders)
    .post(isAuthenticatedUser, authorizeRoles('candidate'), createCalander);

calendarRouter.route('/:calendarId')
    .get(isAuthenticatedUser,
        authorizeRoles('admin', 'superadmin', 'candidate'),
        getCalander,
    )
    .put(isAuthenticatedUser, allowedRoles, updateCalander)
    .delete(isAuthenticatedUser, allowedRoles, deleteCalender);
module.exports = calendarRouter;
