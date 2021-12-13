const { cookieExpire } = require('../config/cookie.config');

// Create JWT token
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(Date.now() + cookieExpire * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.status(statusCode).cookie('token', token, options).json({
    succes: true,
    user,
    token,
  });
};

module.exports = sendToken;
