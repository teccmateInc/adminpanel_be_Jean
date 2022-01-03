const express = require('express');
const router = express.Router;

const {
  getAllClients,
  createNewClient,
  getClient,
  updateClient,
  deleteClient,
  getClientDetails,
} = require('../controllers/client-controller');
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth');
const clientRouter = router();

const allowedRoles = authorizeRoles('admin', 'superadmin');
clientRouter.route('/')
    .get(isAuthenticatedUser, allowedRoles, getAllClients)
    .post(isAuthenticatedUser, allowedRoles, createNewClient);
clientRouter.route('/me')
    .get(isAuthenticatedUser,getClientDetails);

    clientRouter.route('/:clientId')

    .get(isAuthenticatedUser,allowedRoles ,getClient)
    .put(isAuthenticatedUser, allowedRoles, updateClient)
    .delete(isAuthenticatedUser, allowedRoles, deleteClient);


module.exports = clientRouter;
