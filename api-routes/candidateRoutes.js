const express = require('express');
const router = express.Router;
const {
  getAllCandidates,
  createNewCandidate,
  getCandidate,
  updateCandidate,
  deleteCandidate,
} = require('../controllers/candidate-controller');
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth');
const candidateRouter = router();

const allowedRoles = authorizeRoles('admin', 'superadmin');
candidateRouter.route('/')
    .get(isAuthenticatedUser, allowedRoles, getAllCandidates)
    .post(isAuthenticatedUser, allowedRoles, createNewCandidate);


candidateRouter.route('/:candidateId')
    .get(isAuthenticatedUser, getCandidate);

candidateRouter.route('/:userId')
    .put(isAuthenticatedUser, allowedRoles, updateCandidate)
    .delete(isAuthenticatedUser, allowedRoles, deleteCandidate);

module.exports = candidateRouter;
