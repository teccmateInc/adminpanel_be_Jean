const {strictValidArrayWithMinLength,
  handleError,
  strictValidObjectWithKeys,
  generateValidationsErrors,
  handleErrorWithStatus,
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
      res.status(200).json({
        success: false,
        message: 'No Data Found!',
        data: orders,
      });
    }
  } catch (err) {
    handleError(res, 'Orders not found!');
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId)
        .populate('user', 'firstname lastname email');
    if (strictValidObjectWithKeys(order)) {
      res.status(200).json({
        success: true,
        data: order,
      });
    } else {
      res.status(200).json({
        suucess: false,
        message: 'No Data Found!',
        data: order,
      });
    }
  } catch (err) {
    handleError(res, 'Something went Wrong. Try again later!');
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const {isMobile, browser} = req.useragent;
    if ((!isMobile || isMobile) && browser && req.user.role === 'client') {
      {
        return handleErrorWithStatus(
            res,
            404,
            'Invalid request!',
            {...req.useragent});
      }
    } else {
      const {vaccine, notes, position, statusLead, sentProfile} = req.body;
      const order = await Order.create({
        vaccine,
        notes,
        position,
        statusLead,
        sentProfile,
        user: req.user,
      });
      order.save((err) => {
        if (err) {
          handleErrorWithStatus(
              res,
              400,
              'Order Not created. Try again later!',
          );
        }
      });
      res.status(201).json({
        success: true,
        message: 'Order Created successfully!',
      });
    }
  } catch (err) {
    handleError(res, 'Not created!', generateValidationsErrors(err));
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
          handleError(res, 'Order not updated. Try again later!');
        }
      });
      res.status(200).json({
        success: true,
        message: 'Order Updated successfully!',
        data: order,
      });
    } else {
      res.status(200).json({
        suucess: false,
        message: 'No order found!',
      });
    }
  } catch (err) {
    handleError(res, 'Something went Wrong. Try again later!');
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    let order = await Order.findById(req.params.orderId);
    if (!order) {
      handleErrorWithStatus(res, 200, 'Order not found!');
    } else {
      order = await Order.findByIdAndDelete(req.params.orderId);
      res.status(200).json({
        success: true,
        message: 'Order deleted successfully!',
      });
    };
  } catch (err) {
    handleError(res, 'Something went Wrong. Try again later!');
  }
};
