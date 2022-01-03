const express = require('express');
const router = express.Router;
const {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/order-controller');
const {authorizeRoles, isAuthenticatedUser} = require('../middlewares/auth');
const OrderRouter = router();

const allowedRoles = authorizeRoles('admin', 'superadmin');

OrderRouter.route('/')
    .get(isAuthenticatedUser, allowedRoles, getAllOrders)
    .post(isAuthenticatedUser,
        authorizeRoles('client'),
        createOrder,
    );

OrderRouter.route('/:orderId')
    .get(isAuthenticatedUser, allowedRoles, getOrder)
    .put(isAuthenticatedUser, allowedRoles, updateOrder)
    .delete(isAuthenticatedUser, allowedRoles, deleteOrder);

module.exports = OrderRouter;
