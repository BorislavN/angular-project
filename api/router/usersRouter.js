const usersRouter = require("express").Router();

const { authUser, checkForErrors, cloudinaryHelper } = require("../util");
const { carValidation } = require("../validation");
const { carController, offerController } = require("../controller");

usersRouter.get("/offers",
    authUser(),
    offerController.getMyOffers);//my offers //AUTH// //DONE

usersRouter.get("/collection",
    authUser(),
    carController.getMyCars);//my cars //AUTH// //DONE

usersRouter.post("/collection",
    authUser(),
    cloudinaryHelper.parseFormMiddleware,
    carValidation.add,
    checkForErrors, carController.addCar);//add a car //AUTH// //DONE

usersRouter.get("/collection/:carId",
    authUser(),
    carController.getCar);//car details //AUTH// //DONE

usersRouter.put("/collection/:carId",
    authUser(),
    cloudinaryHelper.parseFormMiddleware,
    carValidation.edit, checkForErrors,
    carController.editCar);//edit car //AUTH// //DONE

usersRouter.delete("/collection/:carId",
    authUser(),
    carController.deleteCar);//delete car //AUTH// //DONE

module.exports = usersRouter;