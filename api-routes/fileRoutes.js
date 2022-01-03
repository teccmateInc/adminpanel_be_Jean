const express = require('express');
const {
  getFiles,
  createFile,
  deleteFile,
} = require('../controllers/file-controller');
const multer = require('multer');
const {uploadDirectory} = require('../config/uploadpath.config');
const upload = multer({dest: uploadDirectory});

const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth');
const router = express.Router;
const FileRouter = router();

const allowedRoles = authorizeRoles('admin', 'superadmin');
FileRouter.route('/')
    .get(isAuthenticatedUser, allowedRoles, getFiles)
    .post(isAuthenticatedUser, allowedRoles, upload.single('file'), createFile);

FileRouter.route('/:fileId')
    .delete(isAuthenticatedUser, allowedRoles, deleteFile);

module.exports = FileRouter;
