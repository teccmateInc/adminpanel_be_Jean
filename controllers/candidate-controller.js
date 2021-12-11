const Candidate=require('../models/candidate-model');
const mongoose=require('mongoose');

const {strictValidArrayWithMinLength, handleError} = require('../helper/utils');

// get all candidates
exports.getCandidates = async (req, res, next) => {
  try {
    const candidates= await Candidate.find();
    if (strictValidArrayWithMinLength(candidates, 1)) {
      res.status(200).json({
        success: true,
        candidates,
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'nothing in candidates array',
      });
    }
  } catch (err) {
    handleError(res, 'Candidates not found');
  }
};

// create new candidate
exports.createCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.create(req.body);
    candidate.save((err) => {
      if (err) handleError(res, err);
      else res.json({status: 'success', data: candidate});
    });
  } catch (error) {
    console.log(error);
    if (error && error.code === 11000) handleError(res, 'Email is already exists!');
    else handleError(res, 'candidate not created');
  }
};

// get candidate
exports.getSingleCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findById(req.params.candidateId);
    if (strictValidObjectWithKeys(candidate)) {
      res.status(200).json({
        success: true,
        message: 'Candidate found successfully',
        candidate,
      });
    } else {
      res.status(200).json({
        success: false,
        message: 'Candidate not found',
      });
    }
  } catch (err) {
    console.log(err);
    handleError(res, 'candidate not found');
  }
};

// update candidate
exports.updateACandidate = async (req, res, next) => {
  try {
    let candidate = await Candidate.findById(req.params.candidateId);
    if (strictValidObjectWithKeys(candidate)) {
      candidate = await Candidate.findByIdAndUpdate(req.params.candidateId, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,

      });
      candidate.save((err) => {
        if (err) {
          handleError(res, 'candidate can not update');
        }
      });
      res.status(200).json({
        success: true,
        message: 'candidate updated successfully',
      });
    } else {
      res.status(200).json({
        success: false,
        message: 'candidate not found',
      });
    }
  } catch (err) {
    handleError(res, 'Candidate not found');
  }
};

// delete candidate
exports.deleteACandidate = async (req, res, next) => {
  try {
    let candidate = await Candidate.findById(req.params.candidateId);
    if (strictValidObjectWithKeys(user)) {
      candidate = await Candidate.findByIdAndDelete(req.params.candidateId);
      res.status(200).json({
        success: true,
        message: 'Candidate deleted successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'User not found',
      });
    }
  } catch (err) {
    handleError(res, 'something went wrong');
  }
};
