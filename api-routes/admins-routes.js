const router = require('express');
const userController = require('../controllers/user-controller');
const { AuthorizeRoles, isAuthenticatedUser } = require('../middlewares/auth');
// eslint-disable-next-line new-cap
const user = router.Router();
user.route('/')
    // .get(userController.getUsers)
    // .post(userController.createUser);

user.route('/:userId')
    // .get(userController.getUser)
    // .patch(userController.updateUser)
    // .put(userController.updateUser)
    // .delete(userController.deleteUser);


user.route("/login").post(userController.UserLogin);
user.route("/register").post(userController.registerUser);
user.route("/logout").get(userController.logoutUser);

// user.route("/register/candidate").post(userController.registerCandidate);

user.route("/clients").get(isAuthenticatedUser,AuthorizeRoles("admin","superadmin"),userController.getAllClients);
user.route("/client").post(isAuthenticatedUser,AuthorizeRoles("admin","superadmin"),userController.createNewClient);
user.route("/client/:clientId").get(isAuthenticatedUser,AuthorizeRoles("admin","superadmin"),userController.getClient);
user.route("/client/:clientId").put(isAuthenticatedUser,AuthorizeRoles("admin","superadmin"),userController.updateClient);
user.route("/client/:clientId").delete(isAuthenticatedUser,AuthorizeRoles("admin","superadmin"),userController.deleteClient);

user.route("/candidates").get(isAuthenticatedUser,AuthorizeRoles("admin","superadmin"),userController.getAllCandidates);
user.route("/candidate/new").post(isAuthenticatedUser,AuthorizeRoles("admin","superadmin"),userController.createNewCandidate);
user.route("/candidate/:id").get(isAuthenticatedUser,AuthorizeRoles("admin","superadmin"),userController.getCandidate);
user.route("/candidate/:id").put(isAuthenticatedUser,AuthorizeRoles("admin","superadmin"),userController.updateCandidate);
user.route("/candidate/:id").delete(isAuthenticatedUser,AuthorizeRoles("admin","superadmin"),userController.deleteCandidate);

user.route("/admin").get(isAuthenticatedUser,AuthorizeRoles("superadmin"),userController.getAllAdmins);
user.route("/admin/new").post(isAuthenticatedUser,AuthorizeRoles("superadmin"),userController.createNewAdmin);
user.route("/admin/:id").get(isAuthenticatedUser,AuthorizeRoles("superadmin"),userController.getAdmin);
user.route("/admin/:id").put(isAuthenticatedUser,AuthorizeRoles("superadmin"),userController.updateAdmin);
user.route("/admin/:id").delete(isAuthenticatedUser,AuthorizeRoles("superadmin"),userController.deleteAdmin);

user.route("/superAdmin").get(isAuthenticatedUser,AuthorizeRoles("superadmin"),userController.getSuperAdmin);
user.route("/superAdmin/new").post(isAuthenticatedUser,AuthorizeRoles("superadmin"),userController.createSuperAdmin);
user.route("/superAdmin/:superAdminId").put(isAuthenticatedUser,AuthorizeRoles("superadmin"),userController.updateSuperAdmin);
user.route("/superAdmin/:superAdminId").delete(isAuthenticatedUser,AuthorizeRoles("superadmin"),userController.deleteSuperAdmin);

module.exports = user;
