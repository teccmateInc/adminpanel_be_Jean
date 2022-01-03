const express = require('express');
const {getAllAdmins, createNewAdmin, getAdmin, updateAdmin, deleteAdmin, getAdminDetails} =
    require('../controllers/admin-controller');
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth');
const router = express.Router;
const adminRouter = router();

// Access Allowed
const allowedAccess = authorizeRoles('superadmin');

adminRouter.route('/')
    .get(isAuthenticatedUser, allowedAccess, getAllAdmins)
    .post(isAuthenticatedUser, allowedAccess, createNewAdmin);

adminRouter.route('/:adminId')
    .get(isAuthenticatedUser, allowedAccess, getAdmin)
    .put(isAuthenticatedUser, allowedAccess, updateAdmin)
    .delete(isAuthenticatedUser, allowedAccess, deleteAdmin);

//updated
adminRouter.route('/me')
    .get(isAuthenticatedUser,authorizeRoles('admin'), getAdminDetails);

module.exports = adminRouter;
