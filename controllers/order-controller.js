const {strictValidArrayWithMinLength,
  handleError,
  strictValidObjectWithKeys,
  generateValidationsErrors,
} = require('../helper/utils');
const Order = require('../models/order-model');

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
        .populate('user', 'firstname lastname email');
    if (strictValidArrayWithMinLength(orders, 1)) {
      res.status(200).json({
        success: true,
        data: orders,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'nothing in Orders',
      });
    }
  } catch (err) {
    handleError(res, 'Orders not found');
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId)
        .populate('user', 'firstname lastname email');
    if (strictValidObjectWithKeys(order)) {
      res.status(200).json({
        success: true,
        order,
      });
    } else {
      res.status(204).json({
        suucess: false,
        message: 'No Content',
      });
    }
  } catch (err) {
    handleError(res, 'Something went Wrong');
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const {email, vaccine, notes, position, statusLead, sentProfile} = req.body;
    const order = await Order.create({
      email,
      vaccine,
      notes,
      position,
      statusLead,
      sentProfile,
      user: req.user._id,
    });
    order.save((err) => {
      if (err) {
        status(400).json({
          success: false,
          message: 'Bad Request',
        });
      }
    });
    res.status(201).json({
      success: true,
      message: 'Order Created successfully',
    });
  } catch (err) {
    // console.log(err);
    if (err && err.code === 11000) handleError(res, 'Email is already exists!');
    else handleError(res, 'order not created', generateValidationsErrors(err));
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    let order = await Order.findById(req.params.orderId);
    if (strictValidObjectWithKeys(order)) {
      order = await Order.findByIdAndUpdate(req.params.orderId
          , req.body,
          {new: true, runValidators: false, useFindAndModify: false});
      order.save((err) => {
        if (err) {
          handleError(res, 'Bad Request');
        }
      });
      res.status(200).json({
        success: true,
        message: 'order Updated successfully',
        order,
      });
    } else {
      res.status(204).json({
        suucess: false,
        message: 'No Content',
      });
    }
  } catch (err) {
    console.log(err);
    if (err && err.code === 11000) handleError(res, 'Email is already exists!');
    handleError(res, 'Something went Wrong');
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    let order = await Order.findById(req.params.orderId);
    if (!order) {
      res.status(400).json({
        success: false,
        message: 'Order not found',
      });
    } else {
      order = await Order.findByIdAndDelete(req.params.orderId);
      res.status(200).json({
        success: true,
        message: 'Order deleted successfully',
      });
    };
  } catch (err) {
    handleError(res, 'Order not found');
  }
};
