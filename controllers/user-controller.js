// Import User Model
const User = require('../models/user-model');
const {
  handleError,
  strictValidArrayWithMinLength,
  handleErrorWithStatus,
  strictValidObjectWithKeys,
  generateValidationsErrors,
} = require('../helper/utils');
const sendToken = require('../helper/jwtToken');
const Candidate=require('../models/candidate-model');
const Client = require('../models/client-model');
const Admin = require('../models/administrator-model');
const SuperAdmin =require('../models/superAdministrator-model');


// Handle get Users actions
exports.getUsers = async (_, res) => {
  try {
    const users = await User.find();
    if (strictValidArrayWithMinLength(users, 1)) {
      res.status(200).json({
        success: true,
        data: users,
      });
    } else {
      handleErrorWithStatus(res, 404, 'User not found!');
    }
  } catch (err) {
    handleError(res, 'Something wents wrong. Try again later!');
  }
};

// user login
exports.UserLogin = async (req, res) => {
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      return handleErrorWithStatus(res, 200, 'Email and password required!');
    }
    const user = await User.findOne({email}).select('+password');
    const {isMobile, browser} = req.useragent;
    if (!user) {
      return handleErrorWithStatus(res, 200, 'Invalid email or password!');
    }
    const passwordMatched = await user.comparePassword(password);
    if (!passwordMatched) {
      return handleErrorWithStatus(res, 200, 'Invalid email or password!');
    }
    if ((!isMobile || isMobile) && browser && user.role === 'client') {
      {
        return handleErrorWithStatus(res, 200, 'Invalid request!');
      }
    } else sendToken(user, 200, res);
  } catch (err) {
    console.log(err);
    if (strictValidObjectWithKeys(generateValidationsErrors(err))) {
      handleError(
          res,
          'Invalid email and password!',
          generateValidationsErrors(err),
      );
    } else {
      handleErrorWithStatus(
          res,
          404,
          'Something wents wrong. Try again later!',
      );
    }
  }
};



// logout User
exports.logoutUser = async (req, res, next) => {
  try {
    res.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: 'Logged Out',
    });
  } catch (err) {
    handleError(res, 'Something wents wrong. Try again later!');
  }
};
