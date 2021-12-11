const express=require('express');
const {createAdmin} = require('../controllers/admin-controller');
const router = express.Router;
const AdminRouter = router();

AdminRouter.route('/')
    .get().post(createAdmin);

AdminRouter.route('/:AdminId')
    .get().
    put().
    delete();

module.exports=AdminRouter;
