const router = require('express');
const userController = require('../controllers/user-controller');
// eslint-disable-next-line new-cap
const user = router.Router();
user.route('/')
    .get(userController.getUsers)
    .post(userController.createUser);

user.route('/:userId')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = user;
