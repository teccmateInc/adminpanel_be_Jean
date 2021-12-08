const express=require('express');
const ClientRouter=express.Router();

ClientRouter.route('/')
    .get().post();

ClientRouter.route('/:clientId')
    .get().
    put().
    delete();
module.exports=ClientRouter;
