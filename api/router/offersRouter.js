const { Router } = require("express");

const offersRouter = require("express").Router();

offersRouter.get("/:offerId/comments", console.log);//all comments for offer
offersRouter.post("/:offerId/comments", console.log);//add comment to offer //AUTH//
offersRouter.get("/:offerId", console.log);//offer details
offersRouter.put("/:offerId", console.log);//edit offer //AUTH//
offersRouter.delete("/:offerId", console.log);//remove offer //AUTH//
offersRouter.post("/:offerId", console.log);//buy the car from the offer //AUTH//
offersRouter.get("/", console.log);//get all offers
offersRouter.post("/", console.log);//add an offer //AUTH//

module.exports = offersRouter;