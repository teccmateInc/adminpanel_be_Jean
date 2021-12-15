const SuperAdmin = require('../models/superAdministrator-model');
const User = require('../models/user-model');
const bcrypt = require('bcryptjs');

const {
  handleError,
  strictValidObjectWithKeys,
  strictValidArrayWithMinLength,
  generateValidationsErrors,
  handleErrorWithStatus,
} = require('../helper/utils');


exports.getSuperAdmin = async (req, res, next) => {
  try {
    const user = await SuperAdmin.find()
        .populate('createdBy')
        .populate('updatedBy');
    if (strictValidArrayWithMinLength(user, 1)) {
      res.status(200).json({
        success: true,
        message: 'superAdmin found successfully!',
        data: user,
      });
    } else {
      res.status(200).json({success: false, message: 'No SuperAdmin found!',data:user});
    }
  } catch (err) {
    handleError(res, 'SuperAmin not found!');
  }
};

exports.createSuperAdmin = async (req, res, next) => {
  try {
    const {
      firstname, lastname, email, password, role = 'superadmin',
    } = req.body;
    const Superadmin = await User.create({
      firstname, lastname, email, password, role,
    });
    Superadmin.save(async (err) => {
      if (err) handleError(res, 'SuperAdmin not created!');
      else {
        const superAdmin = await SuperAdmin.create({
          ...req.body, userId: Superadmin.id,
          createdBy: req.user,
        });
        superAdmin.save((err) => {
          if (err) {
            handleError(res, 'SuperAdmin not created!');
          } else {
            res.status(201).json({
              success: true,
              message: 'SuperAdmin created successfully!',
              data: superAdmin,
            });
          }
        });
      }
    });
  } catch (err) {
    if (err && err.code === 11000) handleError(res, 'Email is already exists!');
    else {
      handleError(res, 'SuperAdmin not created!',
          generateValidationsErrors(err));
    }
  }
};

// update super admin
exports.updateSuperAdmin = async (req, res, next) => {
  try {
    let superadmin = await User.findById(req.params.superAdminId);
    if (strictValidObjectWithKeys(superadmin)) {
      if (strictValidObjectWithKeys(req.body)) {
        let updatedPassword = {};
        if (req.body.password) {
          if (req.body.password.length < 8) {
            return handleErrorWithStatus(res, 200, 'Invalid password!');
          }
          updatedPassword = {
            password: await bcrypt.hash(req.body.password, 10),
          };
        }
        superadmin = await User.findByIdAndUpdate(
            req.params.superAdminId,
            {...req.body, ...updatedPassword},
            {new: true, runValidators: true, useFindAndModify: false});
        superadmin = await SuperAdmin.findOneAndUpdate({
          userId: req.params.superAdminId,
        },
        {...req.body, ...updatedPassword, updatedBy: req.user},
        {new: true, runValidators: true, useFindAndModify: false});
      }
      res.status(200).json({
        success: true,
        message: 'SuperAdmin updated successfully!',
        data: superadmin,
      });
    } else {
      return handleErrorWithStatus(res, 200, 'Super Admin not updated!');
    }
  } catch (err) {
    console.log(err);
    if (strictValidObjectWithKeys(generateValidationsErrors(err))) {
      handleError(
          res,
          'Super admin not found!',
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


// delete admin
exports.deleteSuperAdmin = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.superAdminId);
    if (!user) {
      return res.status(200).json({
        success: false,
        message: 'User not found!',
      });
    }
    user = await User.findByIdAndDelete(req.params.superAdminId);
    user = await SuperAdmin.findOneAndRemove({
      userId: req.params.superAdminId,
    });
    res.status(200).json({
      success: true,
      message: 'SuperAdmin deleted successfully!',
    });
  } catch (err) {
    handleError(res, 'something went wrong!');
  }
};

