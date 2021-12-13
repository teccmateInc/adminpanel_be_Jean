const Candidate = require('../models/candidate-model');
const User = require('../models/user-model');
const {
  handleError,
  strictValidObjectWithKeys,
  strictValidArrayWithMinLength,
  generateValidationsErrors,
} = require('../helper/utils');

// create new candidate
exports.createNewCandidate = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, role = 'candidate' } = req.body;
    const user = await User.create({
      firstname, lastname, email, password, role,
    });
    user.save(async (err, user) => {
      if (err) handleError(res, err);
      else {
        const candidate = await Candidate.create({
          ...req.body, userId: user.id, createdBy: req.user
        });
        candidate.save((err) => {
          if (err) handleError(res, 'Unable to create candidate!');
          else {
            res.status(201).json({
              success: true,
              data: candidate,
              message: 'Candidate created succcessfully!',
            });
          }
        });
      }
    });
  } catch (err) {
    if (err && err.code === 11000) handleError(res, 'Email is already exists!');
    else {
      handleError(
        res,
        'Candidate not created!',
        generateValidationsErrors(err));
    }
  }
};

// get all candidates
exports.getAllCandidates = async (req, res, next) => {
  try {
    const users = await Candidate.find()
      .populate("createdBy")
      .populate("updatedBy");
    if (strictValidArrayWithMinLength(users, 1)) {
      res.status(200).json({
        success: true,
        users,
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Candidates Not found!',
      });
    }
  } catch (err) {
    handleError(res, 'Something wents wrong. Try again later!');
  }
};

// get candidate
exports.getCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findById(req.params.candidateId)
      .populate("createdBy")
      .populate("updatedBy");
    if (strictValidObjectWithKeys(candidate)) {
      res.status(200).json({
        success: true,
        message: 'Candidate found successfully!',
        candidate,
      });
    } else {
      res.status(200).json({
        success: false,
        message: 'Candidate not found!',
      });
    }
  } catch (err) {
    handleError(res, 'Something wents wrong. Try again later!');
  }
};

// update candidate
exports.updateCandidate = async (req, res, next) => {
  try {
    let candidate = await User.findById(req.params.userId);
    if (strictValidObjectWithKeys(candidate)) {
      if (strictValidObjectWithKeys(req.body)) {
        candidate = await User.findByIdAndUpdate(req.params.userId, req.body, {
          new: true,
          runValidators: false,
          useFindAndModify: false,
        });
        candidate = await Candidate.findOneAndUpdate({
          userId: req.params.userId,
        }, { ...req.body, updatedBy: req.user },
          {
            new: true,
            runValidators: false,
            useFindAndModify: false,
          });
      }
      res.status(201).json({
        success: true,
        message: 'Candidate updated successfully!',
        data: candidate,
      });
    } else {
      res.status(200).json({
        success: false,
        message: 'Candidate not found!',
      });
    }
  } catch (err) {
    if (strictValidArrayWithMinLength(generateValidationsErrors(err), 1)) {
      handleError(res, 'Candidate not found!', generateValidationsErrors(err))
    } else handleError(res, 'Something wents wrong. Try again later!');
  }
};

// delete candidate
exports.deleteCandidate = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.userId);
    if (strictValidObjectWithKeys(user)) {
      user = await User.findByIdAndDelete(req.params.userId);

      user = await Candidate.findOneAndRemove({
        userId: req.params.userId,
      });
      res.status(200).json({
        success: true,
        message: 'Candidate deleted successfully!',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Candidate not found!',
      });
    }
  } catch (err) {
    handleError(res, 'Something wents wrong. Try again later!');
  }
};
