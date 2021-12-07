module.exports = {
  handleError: (res, errorMsg, obj = {}) => {
    return res.send({
      status: 'error',
      message: errorMsg ?? 'Not Found!',
      ...obj,
    });
  },
};
