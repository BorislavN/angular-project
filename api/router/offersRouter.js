const offersRouter = require("express").Router();
const { authUser, checkForErrors } = require("../util");
const { commentValidation } = require("../validation");
const { commentController } = require("../controller");

offersRouter.get("/:offerId/comments", commentController.getAllComments);//all comments for offer
offersRouter.post("/:offerId/comments", authUser(), commentValidation, checkForErrors, commentController.addComment);//add comment to offer //AUTH//
offersRouter.get("/:offerId", console.log);//offer details
offersRouter.put("/:offerId", authUser(), console.log);//edit offer //AUTH//
offersRouter.delete("/:offerId", authUser(), console.log);//remove offer //AUTH//
offersRouter.post("/:offerId", authUser(), console.log);//buy the car from the offer //AUTH//
offersRouter.get("/", console.log);//get all offers
offersRouter.post("/", authUser(), console.log);//add an offer //AUTH//

module.exports = offersRouter;