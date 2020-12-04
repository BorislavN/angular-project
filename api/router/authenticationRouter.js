const authenticationRouter = require("express").Router();

const { authUser, checkForErrors } = require("../util");
const { authValidator } = require("../validation");
const { userController } = require("../controller");

authenticationRouter.get("/profile",
    authUser(),
    userController.getUserProfile);// get profile //AUTH// //DONE

authenticationRouter.put("/profile",
    authUser(),
    authValidator.edit,
    checkForErrors,
    userController.editUserProfile);// edit profile //AUTH// //TODO

authenticationRouter.post("/balance",
    authUser(),
    authValidator.transfer,
    checkForErrors, console.log);// deposit money //AUTH// //TODO

authenticationRouter.delete("/balance",
    authUser(),
    authValidator.transfer,
    checkForErrors, console.log);// withdraw money //AUTH// //TODO

authenticationRouter.post("/register",
    authValidator.register,
    checkForErrors,
    userController.registerUser);// register user //DONE

authenticationRouter.post("/login",
    authValidator.login,
    checkForErrors,
    userController.loginUser);// login user //DONE

authenticationRouter.post("/logout",
    authUser(),
    userController.logoutUser);// logout user //AUTH// //DONE

module.exports = authenticationRouter;