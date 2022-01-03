const express = require('express');
const router = express.Router;

const {
  getFields,
  getField,
  createField,
  updateField,
  deleteField,
} = require('../controllers/field-controller');
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/auth');
const fieldRouter = router();

const allowedRoles = authorizeRoles('superadmin');
fieldRouter.route('/')
    .get(isAuthenticatedUser, allowedRoles, getFields)
    .post(isAuthenticatedUser, allowedRoles, createField);

fieldRouter.route('/:fieldId')
    .get(isAuthenticatedUser, getField)
    .put(isAuthenticatedUser, allowedRoles, updateField)
    .delete(isAuthenticatedUser, allowedRoles, deleteField);

module.exports = fieldRouter;
