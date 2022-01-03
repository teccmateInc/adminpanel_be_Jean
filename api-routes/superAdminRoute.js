const express = require('express');
const {
  getSuperAdmin,
  createSuperAdmin,
  deleteSuperAdmin,
  updateSuperAdmin,
} = require('../controllers/superAdmin-controller');
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth');
const router = express.Router;
const SuperAdminRouter = router();

SuperAdminRouter.route('/')
    .get(isAuthenticatedUser, authorizeRoles('superadmin'), getSuperAdmin)
    .post(isAuthenticatedUser, authorizeRoles('superadmin'), createSuperAdmin);


SuperAdminRouter.route('/:superAdminId')
    .put(isAuthenticatedUser, authorizeRoles('superadmin'), updateSuperAdmin)
    .delete(isAuthenticatedUser,
        authorizeRoles('superadmin'),
        deleteSuperAdmin);

module.exports = SuperAdminRouter;
