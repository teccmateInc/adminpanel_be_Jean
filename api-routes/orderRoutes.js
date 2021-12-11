const express=require('express');
const {getAllOrders, getOrder, createOrder, updateOrder, deleteOrder} = require('../controllers/order-controller');
const {AuthorizeRoles, isAuthenticatedUser} = require('../middlewares/auth');
const OrderRouter=express.Router();

const allowedRoles = AuthorizeRoles('admin', 'superadmin');

OrderRouter.route('/')
    .get(getAllOrders, allowedRoles)
    .post(isAuthenticatedUser, AuthorizeRoles('client'), createOrder);

OrderRouter.route('/:orderId')
    .get(isAuthenticatedUser, allowedRoles, getOrder)
    .put(isAuthenticatedUser, allowedRoles, updateOrder)
    .delete(isAuthenticatedUser, allowedRoles, deleteOrder);

module.exports=OrderRouter;
