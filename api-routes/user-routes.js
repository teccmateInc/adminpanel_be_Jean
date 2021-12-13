const expressRouter = require('express').Router;
const userController = require('../controllers/user-controller');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const user = expressRouter();

// GET: all users route only for 'superadmin' 
user.route('/')
    .get(
        isAuthenticatedUser,
        authorizeRoles('superadmin'),
        userController.getUsers,
    );

// POST: req for login
user.route('/login').post(userController.UserLogin);

// POST: req for register OR create new user
user.route('/register').post(userController.registerUser);

// GET: req for logout user
user.route('/logout').get(userController.logoutUser);

module.exports = user;
