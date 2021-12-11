const express=require('express');
const { getAllOrders, getOrder, createOrder, updateOrder, deleteOrder } = require('../controllers/order-controller');
const { AuthorizeRoles, isAuthenticatedUser } = require('../middlewares/auth');
const OrderRouter=express.Router();

OrderRouter.route('/')
    .get(getAllOrders)
    .post(isAuthenticatedUser,AuthorizeRoles("client"),createOrder)

OrderRouter.route('/:orderId')
    .get(getOrder).
    put(updateOrder).
    delete(deleteOrder);

module.exports=OrderRouter;
