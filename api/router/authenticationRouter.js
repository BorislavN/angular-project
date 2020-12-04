const authenticationRouter = require("express").Router();
const { authUser } = require("../util");

authenticationRouter.get("/profile", authUser(), console.log);// get profile //AUTH//
authenticationRouter.put("/profile", authUser(), console.log);// edit profile //AUTH//
authenticationRouter.post("/balance", authUser(), console.log);// deposit money //AUTH//
authenticationRouter.delete("/balance", authUser(), console.log);// withdraw money //AUTH//
authenticationRouter.post("/register", console.log);// register user
authenticationRouter.post("/login", console.log);// login user
authenticationRouter.post("/logout", authUser(), console.log);// logout user //AUTH//

module.exports = authenticationRouter;