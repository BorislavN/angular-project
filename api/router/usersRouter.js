const usersRouter = require("express").Router();

usersRouter.get("/offers", console.log);//my offers //AUTH//
usersRouter.get("/collection", console.log);//my cars //AUTH//
usersRouter.post("/collection", console.log);//add a car //AUTH//
usersRouter.get("/collection/:carId", console.log);//car details //AUTH//
usersRouter.put("/collection/:carId", console.log);//edit car //AUTH//
usersRouter.delete("/collection/:carId", console.log);//delete car //AUTH//

module.exports = usersRouter;