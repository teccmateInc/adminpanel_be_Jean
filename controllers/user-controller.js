// Import User Model
const User = require('../models/user-model');
const {handleError} = require('../helper/utils');

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
