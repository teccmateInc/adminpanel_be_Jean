// Import User Model
const User = require('../models/user-model');
const {handleError} = require('../helper/utils');
const sendToken=require("../helper/jwtToken")

// Handle get Users actions
exports.getUsers = (_, res) => {
  User.get((err, users) => {
    if (err) handleError(res, err);
    else {
      res.json({
        status: 'success',
        data: users,
      });
    }
  });
};
exports.UserLogin=async (req, res)=>{
  const {email, password}=req.body;
  if (!email || !password) {
    return res.status(400).json({message: 'enter email and password'});
  }
  const user=await User.findOne({email}).select('+password');
  if (!user) {
    return res.status(401).json({success: false, message: 'Invalid email or password'});
  }
  const passwordMatched=await user.comparePassword(password);
  if (!passwordMatched) {
    return res.status(401).json({success: false, message: 'Invalid email or password'});
  }
  sendToken(user, 200, res);
};
exports.registerUser =async (req, res, next) => {

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    
  });

  sendToken(user, 201, res);
};
exports.logout =async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};
// Handle create User actions
exports.createUser = (req, res) => {
  const {firstName, lastName, email} = req.body;
  const user = new User();
  user.firstName = firstName ?? user.firstName;
  user.lastName = lastName ?? user.lastName;
  user.email = email ?? user.email;

  // save User
  user.save((err) => {
    if (err && err.code === 11000) handleError(res, 'Email is already exists!');
    else if (err) handleError(res, err);
    else res.json({status: 'success', data: user});
  });
};

// Handle get User by Id
exports.getUser = (req, res) => {
  const {userId} = req.params;
  if (userId) {
    User.findById(userId, (err, user) => {
      if (err) handleError(res, 'Invalid user id!');
      else res.json({status: 'success', data: user});
    });
  } else handleError(res, 'Invalid user id!');
};

// Handle update user by Id
exports.updateUser = (req, res) => {
  const {userId} = req.params;
  if (userId) {
    User.findById(userId, (err, user) => {
      if (err) handleError(res, 'Invalid user id!');
      else {
        const {firstName, lastName, email} = req.body;
        user.firstName = firstName ?? user.firstName;
        user.lastName = lastName ?? user.lastName;
        user.email = email ?? user.email;

        // save User
        user.save((err) => {
          if (err) handleError(res, 'Something went wrong try again later!');
          else res.json({status: 'success', data: user});
        });
      }
    });
  } else handleError(res, 'Invalid user id!');
};

// Handle Delete User By Id
exports.deleteUser = (req, res) => {
  const {userId} = req.params;
  if (userId) {
    User.deleteOne({_id: userId}, (err, user) => {
      if (err) handleError(res, 'No User Found!');
      else {
        res.json({
          status: 'success',
          data: user,
          message: 'Deleted Successfully!',
        });
      }
    });
  } else handleError(res, 'Invalid user id!');
};
