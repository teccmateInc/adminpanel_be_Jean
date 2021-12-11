const utils = {
  handleError: (res, errorMsg, obj = {}) => {
    return res.send({
      success: false,
      status: 'error',
      message: errorMsg ?? 'Not Found!',
      ...obj,
    });
  },
  handleErrorWithStatus: (res, statusCode, errorMsg, obj = {}) => {
    return res.status(statusCode).send({
      success: false,
      status: 'error',
      message: errorMsg ?? 'Not Found!',
      ...obj,
    });
  },
  generateValidationsErrors: (errors) => {
    if (utils.strictValidObjectWithKeys(errors)) {
      let { errors: errs, _message: msg } = errors
      console.log(utils.strictValidObjectWithKeys(errs))
      if (utils.strictValidObjectWithKeys(errs)) {
        let requiredFields = Object.keys(errs).map(key => {
          return { ...errs[key]?.properties }
        })
        return { requiredFields, msg }
      } return { msg }
    }
  },
  strictValidObject: (obj) => {
    return obj &&
      obj === Object(obj) &&
      Object.prototype.toString.call(obj) !== '[object Array]'
  },
  strictValidObjectWithKeys: (obj) => {
    return obj &&
      obj === Object(obj) &&
      Object.prototype.toString.call(obj) !== '[object Array]' && !!Object.keys(obj).length
  },
  strictValidArray: (arr) => arr && Array.isArray(arr),

  strictValidArrayWithMinLength: (arr, minLength) =>
    arr && Array.isArray(arr) && arr.length >= minLength
};

module.exports = utils