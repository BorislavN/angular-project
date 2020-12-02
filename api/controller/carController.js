const { carModel, userModel } = require("../model");
const { cloudinaryHelper } = require("../util");

function getMyCars(req, res, next) {
    carModel.find({ ownerId: req.user.userId })
        .populate({
            path: "ownerId",
            select: "-password"
        })
        .then(cars => {
            res.status(200).json(cars);
        })
        .catch(next);
};

function getCar(req, res, next) {
    const { carId } = req.params;

    carModel.findById(carId)
        .populate({
            path: "ownerId",
            select: "-password"
        })
        .then(car => {
            res.status(200).json(car);
        })
        .catch(next);
};

function addCar(req, res, next) {

};

function editCar(req, res, next) {

};

function deleteCar(req, res, next) {

};

module.exports = {
    getMyCars,
    getCar,
    addCar,
    editCar,
    deleteCar
}
