const authenticationRouter = require("express").Router();

authenticationRouter.get("/profile", console.log);// get profile //AUTH//
authenticationRouter.put("/profile", console.log);// edit profile //AUTH//
authenticationRouter.post("/balance", console.log);// deposit money //AUTH//
authenticationRouter.delete("/balance", console.log);// withdraw money //AUTH//
authenticationRouter.post("/register", console.log);// register user
authenticationRouter.post("/login", console.log);// login user
authenticationRouter.post("/logout", console.log);// logout user //AUTH//

module.exports = authenticationRouter;