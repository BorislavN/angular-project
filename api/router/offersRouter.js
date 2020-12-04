const offersRouter = require("express").Router();
const { authUser, checkForErrors } = require("../util");
const { commentValidation, offerValidation } = require("../validation");
const { commentController, offerController } = require("../controller");

offersRouter.get("/:offerId/comments", commentController.getAllComments);//all comments for offer //DONE
offersRouter.post("/:offerId/comments", authUser(), commentValidation, checkForErrors, commentController.addComment);//add comment to offer //AUTH// //DONE
offersRouter.get("/:offerId", offerController.getOffer);//offer details //DONE
offersRouter.put("/:offerId", authUser(), offerValidation, offerController.editOffer);//edit offer //AUTH// //DONE
offersRouter.delete("/:offerId", authUser(), offerController.deleteOffer);//remove offer //AUTH// //DONE
offersRouter.post("/:offerId", authUser(), console.log);//buy the car from the offer //AUTH// //TODO
offersRouter.get("/", offerController.getAllOffers);//get all offers //DONE
offersRouter.post("/", authUser(), offerValidation, checkForErrors, offerController.addOffer);//add an offer //AUTH// //DONE

module.exports = offersRouter;