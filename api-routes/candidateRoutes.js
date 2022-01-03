const express = require('express');
const router = express.Router;
const {
  getAllCandidates,
  createNewCandidate,
  getCandidate,
  updateCandidate,
  deleteCandidate,
  getCandidateDetails
} = require('../controllers/candidate-controller');
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth');
const candidateRouter = router();

const allowedRoles = authorizeRoles('admin', 'superadmin');
candidateRouter.route('/')
    .get(isAuthenticatedUser, allowedRoles, getAllCandidates)
    .post(isAuthenticatedUser, allowedRoles, createNewCandidate);
    candidateRouter.route('/me')
    .get(isAuthenticatedUser,getCandidateDetails);

candidateRouter.route('/:candidateId')
    .get(isAuthenticatedUser,allowedRoles,getCandidate);

candidateRouter.route('/:userId')
    .put(isAuthenticatedUser, allowedRoles, updateCandidate)
    .delete(isAuthenticatedUser, allowedRoles, deleteCandidate);

module.exports = candidateRouter;
