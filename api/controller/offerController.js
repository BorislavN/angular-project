const { offerModel, carModel } = require("../model");


function getAllOffers(req, res, next) {
    offerModel.find()
        .populate("carId")
        .populate({
            path: "authorId",
            select: "username"
        })
        .then(offers => {
            res.status(200).json(offers);
        })
        .catch(next);
};

function getMyOffers(req, res, next) {
    const { userId } = req.user;

    offerModel.find({ authorId: userId })
        .populate("carId")
        .then(offers => {
            res.status(200).json(offers);
        })
        .catch(next);
};

function getOffer(req, res, next) {
    const { offerId } = req.params;

    offerModel.findById(offerId)
        .populate("carId")
        .populate({
            path: "authorId",
            select: "username"
        })
        .then(offerDetails => {
            if (offerDetails) {
                res.status(200).json(offerDetails);
            }
            throw new Error(`404${__delimiter}Offer with id: ${offerId} not found!`);
        })
        .catch(next);
};

function addOffer(req, res, next) {
    const { userId } = req.user;
    const { carId, price, description } = req.body;

    carModel.findOne({ carId, authorId: userId })
        .then(car => {
            if (car) {
                car.forSale = true;

                return Promise
                    .all([car.save(), offerModel
                        .create({ authorId: userId, carId, price, description })]);
            }
            throw new Error(`403${__delimiter}Car with that id does not exist or you are not the owner of it!`);
        })
        .then(([_, offer]) => {
            res.status(201)
                .json({ "message": `New offer added  carId: ${offer.carId} authorId:${offer.authorId}!` });
        })
        .catch(next);
};

function editOffer(req, res, next) {
    const { description, price } = req.body;
    const { offerId } = req.params;
    const { userId } = req.user;

    offerModel.findOneAndUpdate({ _id: offerId, authorId: userId }, { description, price })
        .then(result => {
            if (result) {
                res.status(200).json({ "message": `Offer with id: ${offerId} updated successfully!` });
            }
            throw new Error(`404${__delimiter}Offer with that id does not exist or you don't own the rights to it!`);
        })
        .catch(next);
};

function deleteOffer(req, res, next) {
    const carId = req.query.carId | "";
    const { userId } = req.user;
    const { offerId } = req.params;

    Promise.all([carModel.findById(carId), offerModel.deleteOne({ _id: offerId, authorId: userId, carId })])
        .then(([car, deleteResult]) => {
            if (deleteResult.deletedCount === 0) {
                throw new Error(`404${__delimiter}Such offer does not exist or you don't own the rights to it!`);
            }
            car.forSale = false;
            car.save();

            res.status(200).json({ "message": `${deleteResult.deletedCount} entry removed successfully!` });
        })
        .catch(next);
};

module.exports = {
    getAllOffers,
    getMyOffers,
    getOffer,
    addOffer,
    editOffer,
    deleteOffer
};