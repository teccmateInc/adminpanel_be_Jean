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
        data: calendars,
      });
    } else {
      res.status(200).json({
        success: false,
        message: 'No data found!',
        data: calendars,
      });
    }
  } catch (err) {
    handleError(res, 'Something wents wrong. Try again later!');
  }
};
exports.getCalander = async (req, res, next) => {
  const calendar = await Calendar.findById(req.params.calendarId)
      .populate('user', 'firstname lastname email');
  if (strictValidObjectWithKeys(calendar)) {
    res.status(200).json({
      success: true,
      message: 'Successful!',
      data: calendar,
    });
  } else {
    handleError(res, 'Not data found!');
  }
};


exports.createCalander = async (req, res, next) => {
  try {
    const {date, to, from} = req.body;
    const calander = await Calendar.create({
      date, to, from, user: req.user,
    });
    calander.save((err) => {
      if (err) {
        handleError(res, 'Not Created. Try again later!');
      } else {
        res.status(201).json({
          success: true,
          message: 'Created successfully',
          calander,
        });
      }
    });
  } catch (err) {
    handleError(res,
        'Something wents wrong. Try again later!',
        generateValidationsErrors(err),
    );
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
        message: 'Updated successfully!',
        data: calander,
      });
    } else {
      res.status(200).json({
        success: false,
        message: 'No data found!',
      });
    }
  } catch (error) {
    console.log(error);
    handleError(res, 'Something wents wrong. Try again later!');
  }
};
exports.deleteCalender = async (req, res, next) => {
  try {
    let calander = await Calendar.findById(req.params.calendarId);
    if (strictValidObjectWithKeys(calander)) {
      calander = await Calendar.findByIdAndDelete(req.params.calendarId);
      res.status(200).json({
        success: true,
        message: 'Deleted successfully!',
      });
    } else {
      res.status(200).json({
        success: false,
        message: 'Not data found!',
      });
    }
  } catch (error) {
    handleError(res, 'Something wents wrong. Try again later!');
  }
};
