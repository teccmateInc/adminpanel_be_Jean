const express=require('express');
const {getSingleCandidate, updateACandidate, deleteACandidate, getCandidates, createCandidate} = require('../controllers/candidate-controller');
const {isAuthenticatedUser, AuthorizeRoles}=require('../middlewares/auth');
const CandidateRouter=express.Router();

CandidateRouter.route('/')
    .get(getCandidates)
    .post(createCandidate);


CandidateRouter.route('/:candidateId')
    .get(getSingleCandidate).
    put(updateACandidate).
    delete(deleteACandidate);

module.exports=CandidateRouter;
