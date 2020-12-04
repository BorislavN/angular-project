const usersRouter = require("express").Router();
const { authUser } = require("../util");

usersRouter.get("/offers", authUser(), console.log);//my offers //AUTH//
usersRouter.get("/collection", authUser(), console.log);//my cars //AUTH//
usersRouter.post("/collection", authUser(), console.log);//add a car //AUTH//
usersRouter.get("/collection/:carId", authUser(), console.log);//car details //AUTH//
usersRouter.put("/collection/:carId", authUser(), console.log);//edit car //AUTH//
usersRouter.delete("/collection/:carId", authUser(), console.log);//delete car //AUTH//

module.exports = usersRouter;