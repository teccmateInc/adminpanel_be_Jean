const express=require('express');
const {getAllCandidate, createCandidate, getCandidate, updateCandidate, deleteCandidate, candidateLogin} = require('../controllers/candidate-controller');
const {isAuthenticatedUser}=require("../middlewares/auth")
const CandidateRouter=express.Router();

CandidateRouter.route('/')
    .get(getAllCandidate)
    .post(createCandidate);

CandidateRouter.route('/login')
    .post(candidateLogin);


CandidateRouter.route('/:candidateId')
    .get(isAuthenticatedUser,getCandidate).
    put(isAuthenticatedUser,updateCandidate).
    delete(deleteCandidate);

module.exports=CandidateRouter;
