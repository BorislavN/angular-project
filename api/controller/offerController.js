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
            res.status(404).json({ "message": `Offer with id: ${offerId} not found!` })
        })
        .catch(next);
};

function addOffer(req, res, next) {
    const { userId } = req.user;
    const { carId, price, description } = req.body;

    carModel.findOne({ carId, authorId: userId })
        .then(car => {
            if (car) {
                return Promise.all([offerModel.create({ authorId: userId, carId, price, description })]);
            } else {
                res.status(403).json({ "message": "Car with that id does not exist or you are not the owner of it!" });
            }
        })
        .then(([offer]) => {
            res.status(201).json({ "message": `New offer added  carId: ${offer.carId} authorId:${offer.authorId}!` })
        })
        .catch(next);
};

function editOffer(req, res, next) {

};

function deleteOffer(req, res, next) {

};

module.exports = {
    getAllOffers,
    getMyOffers,
    getOffer,
    addOffer,
    editOffer,
    deleteOffer
};