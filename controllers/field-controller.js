const Field = require('../models/field-model');

const {
  handleError,
  strictValidArrayWithMinLength,
  generateValidationsErrors,
  isArrayOfStrings,
  strictValidObjectWithKeys,
  isArrayOfNumbers,
} = require('../helper/utils');

exports.getFields = async (req, res, next) => {
  try {
    const allfields = await Field.find({});
    if (strictValidArrayWithMinLength(allfields, 1)) {
      res.status(200).json({
        success: true,
        message: 'fields found successfully!',
        data: allfields,
      });
    } else {
      res.status(200).json({success: false,
        message: 'No fields found!', data: user});
    }
  } catch (err) {
    console.log(err);
    handleError(res, 'Error fields not found!');
  }
};

exports.getField = async (req, res, next) => {
  try {
    const field = await Field.findOne({type: req.params.type});
    if (strictValidArrayWithMinLength(field, 1)) {
      res.status(200).json({
        success: true,
        message: 'field found successfully!',
        data: field,
      });
    } else {
      res.status(200).json({success: false,
        message: 'No field found!', data: user});
    }
  } catch (err) {
    console.log(err);
    handleError(res, 'Error field not found!');
  }
};

exports.createField = async (req, res, next) => {
  try {
    const {type, arrayString, arrayNumber} = req.body;

    if (type) {
      let field = undefined;
      if (isArrayOfStrings(arrayString)) {
        field = await Field.create({
          type: type,
          arrayString: arrayString,
        });
      } else if (isArrayOfNumbers(arrayNumber)) {
        field = await Field.create({
          type: type,
          arrayString: arrayNumber,
        });
      }

      if (field) {
        field.save(async (err) => {
          if (err) handleError(res, 'field not created!');
          else {
            res.status(201).json({
              success: true,
              message: 'field created successfully!',
              data: field,
            });
          }
        });
      } else {
        handleError(res,
            'Array Type error (string or number)',
        );
      }
    } else {
      handleError(res,
          'No type',
      );
    }
  } catch (err) {
    console.log(err);
    handleError(res,
        'Something wents wrong. Try again later!',
        generateValidationsErrors(err),
    );
  }
};

exports.updateField = async (req, res, next) => {
  try {
    let field = await Field.findById(req.params.fieldId);
    if (strictValidObjectWithKeys(field)) {
      field = await Field.findByIdAndUpdate(req.params.fieldId
          , req.body,
          {new: true, runValidators: false, useFindAndModify: false});
      field.save((err) => {
        if (err) {
          handleError(res, 'Field not updated. Try again later!');
        }
      });
      res.status(200).json({
        success: true,
        message: 'Field Updated successfully!',
        data: field,
      });
    } else {
      res.status(200).json({
        suucess: false,
        message: 'No field found!',
      });
    }
  } catch (err) {
    console.log(err);
    handleError(res, 'Something went Wrong. Try again later!');
  }
};

exports.deleteField = async (req, res, next) => {
  try {
    let field = await Field.findById(req.params.fieldId);
    if (strictValidObjectWithKeys(field)) {
      field = await Field.findByIdAndDelete(req.params.fieldId);
      res.status(200).json({
        success: true,
        message: 'field deleted successfully!',
      });
    } else {
      res.status(200).json({
        success: false,
        message: 'field not found!',
      });
    }
  } catch (err) {
    console.log(err);
    handleError(res, 'Something wents wrong. Try again later!');
  }
};
