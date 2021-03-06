const Admin = require('../models/administrator-model');
const User = require('../models/user-model');
const {
  handleError,
  strictValidObjectWithKeys,
  strictValidArrayWithMinLength,
  generateValidationsErrors,
} = require('../helper/utils');
const bcrypt = require('bcryptjs');

// get all admins
exports.getAllAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find()
        .populate('createdBy')
        .populate('updatedBy');
    if (strictValidArrayWithMinLength(admins, 1)) {
      res.status(200).json({
        success: true,
        data: admins,
      });
    } else {
      res.status(200).json({success: false,
        message: 'no Admin found', data: admins});
    }
  } catch (err) {
    handleError(res, 'invalid admin');
  }
};

// get admin by id
exports.getAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.adminId)
        .populate('createdBy')
        .populate('updatedBy');
    if (strictValidObjectWithKeys(admin)) {
      res.status(200).json({
        success: true,
        message: 'Admin found successfully',
        data: admin,
      });
    } else {
      res.status(200).json({
        success: false,
        message: 'Admin not found',
        data: admin,
      });
    }
  } catch (err) {
    handleError(res, 'Admin not found!');
  }
};

//updated
// get client details
exports.getAdminDetails = async(req,res,next)=>{
  try {
    const admin = await Admin.find({userId:req.user.id})
    if(strictValidArrayWithMinLength(admin,1)){
      res.status(200).json({
        success: true,
        message: "Admin found successfully!",
        data: admin
      })
    }
    else {
      res.status(200).json({
        success:false,
        message:'Admin not found!',
        data:admin
      })
    }
  } catch (err) {
    handleError(res,'Something wents wrong. Try again later!');
  }
};


// create admin
exports.createNewAdmin = async (req, res, next) => {
  try {
    const {firstname, lastname, email, password, role = 'admin'} = req.body;
    console.log(req.body)
    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
      role,
    });
    user.save(async (err) => {
      if (err) handleError(res, err);
      else {
        const admin = await Admin.create({
          ...req.body,
          userId: user.id,
          createdBy: req.user,
        });
        admin.save((err) => {
          if (err) {
            handleError(res, 'Admin not created');
          } else {
            res.status(200).json({
              success: true,
              message: 'Admin created successfully',
              data: admin,
            });
          }
        });
      }
    });
  } catch (err) {
    if (err && err.code === 11000) handleError(res, 'Email is already exists!');
    else handleError(res, 'Admin not created', generateValidationsErrors(err));
  }
};

// update Admin
exports.updateAdmin = async (req, res, next) => {
  let user = await User.findById(req.params.adminId);
  if (strictValidObjectWithKeys(user)) {
    if (strictValidObjectWithKeys(req.body)) {
      let updatedPassword = {};
      if (req.body.password) {
        if (req.body.password.length < 8) {
          return handleErrorWithStatus(res, 200, 'Invalid password!');
        }
        updatedPassword = {password: await bcrypt.hash(req.body.password, 10)};
      }
      user = await User.findByIdAndUpdate(
          req.params.adminId,
          {...req.body, ...updatedPassword},
          {
            new: true,
            runValidators: false,
            useFindAndModify: false,
          });
      user = await Admin.findOneAndUpdate({
        userId: req.params.adminId,
      }, {...req.body, ...updatedPassword, updatedBy: req.user},
      {new: true, runValidators: false, useFindAndModify: false});
    }
    res.status(200).json({
      success: true,
      message: 'Admin updated successfully',
      data: user,
    });
  } else {
    if (strictValidObjectWithKeys(generateValidationsErrors(err))) {
      handleError(res, 'Admin not found!', generateValidationsErrors(err));
    } else {
      handleErrorWithStatus(
          res,
          404,
          'Something wents wrong. Try again later!',
      );
    }
  }
};

// delete admin
exports.deleteAdmin = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.adminId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      });
    }
    user = await User.findByIdAndDelete(req.params.adminId);
    user = await Admin.findOneAndRemove({userId: req.params.adminId});
    res.status(200).json({
      success: true,
      message: 'Admin deleted successfully',
    });
  } catch (err) {
    handleError(res, 'something went wrong');
  }
};
