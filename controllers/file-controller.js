const File = require('../models/file-model');
const fs = require('fs');
const path = require('path');

const {
  handleError,
  strictValidArrayWithMinLength,
  generateValidationsErrors,
} = require('../helper/utils');

exports.getFiles = async (req, res, next) => {
  try {
    const allfiles = await File.find();
    if (strictValidArrayWithMinLength(allfiles, 1)) {
      res.status(200).json({
        success: true,
        message: 'files found successfully!',
        data: allfiles,
      });
    } else {
      res.status(200).json({success: false,
        message: 'No files found!', data: user});
    }
  } catch (err) {
    handleError(res, 'files not found!');
  }
};

exports.createFile = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const fileInfo = req.file;

    if (fileInfo) {
      const fileup = await File.create({
        userId: userId,
        originalname: fileInfo.originalname,
        encoding: fileInfo.encoding,
        mimetype: fileInfo.mimetype,
        size: fileInfo.size,
        destination: fileInfo.destination,
        filename: fileInfo.filename,
      });

      fileup.save(async (err) => {
        if (err) handleError(res, 'File not created!');
        else {
          res.status(201).json({
            success: true,
            message: 'File created successfully!',
            data: fileup,
          });
        }
      });
    } else {
      handleError(res,
          'No file uploaded.',
      );
    }
  } catch (err) {
    handleError(res,
        'Something wents wrong. Try again later!',
        generateValidationsErrors(err),
    );
  }
};

// delete admin
exports.deleteFile = async (req, res, next) => {
  try {
    let file = await File.findById(req.params.fileId);
    if (!file) {
      return res.status(200).json({
        success: false,
        message: 'file not found',
      });
    }
    file = await File.findByIdAndDelete(req.params.fileId);
    // Delete file
    const filepath = path.join(file.destination, file.filename);
    fs.unlink(filepath, (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.status(200).json({
      success: true,
      message: 'file deleted successfully!',
    });
  } catch (err) {
    handleError(res, 'something went wrong!');
  }
};
