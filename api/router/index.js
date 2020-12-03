const express = require("express");
const apiRouter = express.Router();
const authRouter = express.Router();

const offerRouter = require("./offersRouter");
const usersRouter = require("./usersRouter");
const authenticationRouter = require("./authenticationRouter");

apiRouter.use("/offers", offerRouter);
apiRouter.use("/users", usersRouter);
authRouter.use("/user", authenticationRouter);

module.exports = { apiRouter, authRouter };