const express=require('express');
const OrderRouter=express.Router();

OrderRouter.route('/')
    .get().post();

OrderRouter.route('/:orderId')
    .get().
    put().
    delete();

module.exports=OrderRouter;
