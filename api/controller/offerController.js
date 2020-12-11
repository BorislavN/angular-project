const { offerModel, carModel, userModel } = require("../model");

function getAllOffers(req, res, next) {
    const page = req.query.page || 1;
    let skipCount = (+page - 1) * 10;

    offerModel.countDocuments()
        .then(value => {
            if (skipCount < 0 || value < skipCount) {
                skipCount = 0;
            }
            return Promise.all([Promise.resolve(value), Promise.resolve((skipCount / 10) + 1), offerModel.find()
                .sort({ createdAt: -1 })
                .skip(skipCount)
                .limit(10)
                .populate("carId")
                .populate({
                    path: "authorId",
                    select: "username"
                })]);
        })
        .then(([count, currentPage, offers]) => {
            res.status(200).json({ offers, currentPage, maxPages: Math.ceil((count / 10)) });
        })
        .catch(next);
};

function getMyOffers(req, res, next) {
    const { userId } = req.user;

    offerModel.find({ authorId: userId })
        .sort({ createdAt: -1 })
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
            } else {
                throw new Error(`404${__delimiter}Offer with id: ${offerId} not found!`);
            }
        })
        .catch(next);
};

function addOffer(req, res, next) {
    const { userId } = req.user;
    const { carId, price, description } = req.body;

    carModel.findOne({ _id: carId, ownerId: userId })
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

    offerModel.findOneAndUpdate({ _id: offerId, authorId: userId }, { description, price }, { new: true })
        .then(result => {
            if (result) {
                res.status(200).json({ "price": result.price, "description": result.description });
            } else {
                throw new Error(`404${__delimiter}Offer with that id does not exist or you don't own the rights to it!`);
            }
        })
        .catch(next);
};

function deleteOffer(req, res, next) {
    const carId = req.query.carId || "";
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

function buyCarFromOffer(req, res, next) {
    const { userId } = req.user;
    const { offerId } = req.params;

    offerModel.findById(offerId)
        .then((offer) => {
            if (offer) {
                if (userId === offer.authorId) {
                    throw new Error(`400${__delimiter}You can't buy your own car!`);
                }
                return Promise.all([userModel.findById(userId),
                userModel.findById(offer.authorId),
                carModel.findById(offer.carId),
                Promise.resolve(offer.price),
                Promise.resolve(offer._id)]);
            }
            throw new Error(`404${__delimiter}Such offer does not exist!`);
        })
        .then(([curr, owner, car, price, id]) => {
            const diff = (curr.balance - price);

            if (diff >= 0) {
                curr.balance = diff;
                owner.balance = (owner.balance + price);
                car.forSale = false;
                car.ownerId = curr._id;

                return Promise.all([curr.save(),
                owner.save(),
                car.save(),
                offerModel.deleteOne({ _id: id })]);
            }
            throw new Error(`400${__delimiter}Your funds are not sufficient to buy this car!`);
        })
        .then(([_c, _o, _v, removed]) => {
            if (removed.deletedCount === 1) {
                res.status(200).json({ "message": "Car purchased successfully!" })
            }
        })
        .catch(next);
};

module.exports = {
    getAllOffers,
    getMyOffers,
    getOffer,
    addOffer,
    editOffer,
    deleteOffer,
    buyCarFromOffer
};