const express=require('express');
const SuperAdminRouter=express.Router();

SuperAdminRouter.route('/')
    .get().post();

SuperAdminRouter.route('/:SuperAdminId')
    .get().
    put().
    delete();

module.exports=SuperAdminRouter;
