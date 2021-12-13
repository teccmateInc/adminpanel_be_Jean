const {
  handleError,
  generateValidationsErrors,
  strictValidObjectWithKeys,
  strictValidArrayWithMinLength,
} = require('../helper/utils');
const Calendar = require('../models/calender-model');

exports.getAllCalanders = async (req, res, next) => {
  try {
    const calendars = await Calendar.find()
        .populate('user', 'firstname lastname email');
    if (strictValidArrayWithMinLength(calendars, 1)) {
      res.status(200).json({
        success: true,
        calendars,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'nothing in Calendar',
      });
    }
  } catch (err) {
    console.log(err);
    handleError(res, 'Calendars not found');
  }
};
exports.getCalander = async (req, res, next) => {
  const calendar = await Calendar.findById(req.params.calendarId)
      .populate('user', 'firstname lastname email');
  if (strictValidObjectWithKeys(calendar)) {
    res.status(200).json({
      success: true,
      message: 'Calendar found!',
      calendar,
    });
  } else {
    handleError(res, 'Calander not found');
  }
};


exports.createCalander = async (req, res, next) => {
  try {
    const {date, to, from} = req.body;
    const calander = await Calendar.create({
      date, to, from, user: req.user._id,
    });
    calander.save((err) => {
      if (err) {
        handleError(res, 'Not Created');
      } else {
        res.status(201).json({
          success: true,
          message: 'Created successfully',
          calander,
        });
      }
    });
  } catch (err) {
    console.log(err);
    if (err && err.code === 11000) handleError(res, 'Email is already exists!');
    else {
      handleError(res,
          'Calendar not created',
          generateValidationsErrors(err),
      );
    }
  }
};
exports.updateCalander = async (req, res, next) => {
  try {
    let calander = await Calendar.findById(req.params.calendarId);
    if (strictValidObjectWithKeys(calander)) {
      calander = await Calendar.findByIdAndUpdate(req.params.calendarId,
          req.body, {new: true, runValidators: false});
      res.status(200).json({
        success: true,
        message: 'Calander Updated',
        data: calander,
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Calander not found',
      });
    }
  } catch (error) {
    console.log(error);
    handleError(res, 'Calender not found');
  }
};
exports.deleteCalender = async (req, res, next) => {
  try {
    let calander = await Calendar.findById(req.params.calendarId);
    if (strictValidObjectWithKeys(calander)) {
      calander = await Calendar.findByIdAndDelete(req.params.calendarId);
      res.status(200).json({
        success: true,
        message: 'Calander Deleted',
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Calander not found',
      });
    }
  } catch (error) {
    handleError(res, 'Calander not found');
  }
};
