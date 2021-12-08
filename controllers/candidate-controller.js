const Candidate=require('../models/candidate-model');
const mongoose=require('mongoose');

exports.getAllCandidate=async (req, res, next)=>{
  const Candidates=await Candidate.find();
  res.status(200).json({
    success: true,
    Candidates,
    message: 'candidates found successfully',
  });
};
exports.candidateLogin=async (req, res, next)=>{
  const {email, password}=req.body;
  if (!email || !password) {
    return res.status(400).json({message: 'enter email and password'});
  }
  const user=Candidate.findOne({email}).select('+password');
  if (!user) {
    return res.status(401).json({success: false, message: 'Invalid email or password'});
  }
  const passwordMatched=await Candidate.comparePassword(password);
  if (!passwordMatched) {
    return res.status(401).json({success: false, message: 'Invalid email or password'});
  }
  res.status(200).json({message: 'Candidate found successfully'});
};
exports.createCandidate=async (req, res, next)=>{
  // const candidate=await Candidate.create(req.body)
  res.status(201).json({
    success: true,
    // candidate
    message: 'candidate created successfully',
  });
};
exports.getCandidate=async (req, res, next)=>{
  // const candidate=await Candidate.create(req.params.id)
  res.status(200).json({
    success: true,
    // candidate
    message: 'candidate found successfully',
  });
};
exports.updateCandidate=async (req, res, next)=>{
  // const candidate=await Candidate.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false})
  // if(!candidate){
  //     next(err=>res.err)
  // }

  res.status(200).json({
    success: true,
    // candidate
    message: 'candidate updated successfully',
  });
};
exports.deleteCandidate=async (req, res, next)=>{
  // await Candidate.findByIdAndRemove(req.params.id)
  res.status(201).json({
    success: true,
    message: 'candidate deleted successfully',
  });
};
