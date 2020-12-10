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
    userController.editUserProfile);// edit profile //AUTH// //DONE

authenticationRouter.post("/balance",
    authUser(),
    authValidator.transfer,
    checkForErrors, userController.depositMoney);// deposit money //AUTH// //DONE

authenticationRouter.put("/balance",
    authUser(),
    authValidator.transfer,
    checkForErrors, userController.withdrawMoney);// withdraw money //AUTH// //DONE

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