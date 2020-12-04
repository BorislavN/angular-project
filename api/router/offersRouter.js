const offersRouter = require("express").Router();
const { authUser } = require("../util");

offersRouter.get("/:offerId/comments", console.log);//all comments for offer
offersRouter.post("/:offerId/comments", authUser(), console.log);//add comment to offer //AUTH//
offersRouter.get("/:offerId", console.log);//offer details
offersRouter.put("/:offerId", authUser(), console.log);//edit offer //AUTH//
offersRouter.delete("/:offerId", authUser(), console.log);//remove offer //AUTH//
offersRouter.post("/:offerId", authUser(), console.log);//buy the car from the offer //AUTH//
offersRouter.get("/", console.log);//get all offers
offersRouter.post("/", authUser(), console.log);//add an offer //AUTH//

module.exports = offersRouter;