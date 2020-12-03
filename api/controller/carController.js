const e = require("express");
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
    const { make, model, year, miles, powertrain, transmission, pictures } = req.body;
    const { userId } = req.user;

    carModel.create({ make, model, year, miles, powertrain, transmission, pictures, "ownerId": userId })
        .then((newCar) => {
            res.status(201).send({
                "message": `Car  (make: ${newCar.make}, year: ${newCar.year} miles: ${newCar.miles}) created successfully!`
            });
        })
        .catch(next);
};

function editCar(req, res, next) {
    const { carId } = req.params;

    carModel.findById(carId)
        .then((car) => {
            if (car && (req.user.userId === car.ownerId)) {
                const { ownerId, pictures, ...otherFields } = req.body;

                if (ownerId) {
                    if (await userModel.exists({ _id: ownerId })) {//Checks if the new owner actually exist...
                        Object.assign(otherFields, { ownerId });
                    } else {
                        throw new Error(`User with _id: ${ownerId} doesn't exist!`)
                    }
                }

                if (pictures && (pictures.length > 0)) {
                    Object.assign(otherFields, { pictures });
                    cloudinaryHelper.deleteOldCloudinaryPictures(car.pictures);
                }

                return Promise.all([carModel.findByIdAndUpdate(carId, { ...otherFields }, { new: true })]);
            } else {
                res.status(404).json({ "message": "Car with that id doesn't exist or you don't have permission to modify it!" })
            }
        })
        .then(([updatedCar]) => {
            res.status(200)
                .send({ "message": `Car(make: ${updatedCar.make}, year: ${updatedCar.year}, miles: ${updatedCar.miles}) updated successfully!` });
        })
        .catch(next);
};

function deleteCar(req, res, next) {
    const { carId } = req.params;

    carModel.findById(carId)
        .then((car) => {
            if (car && (req.user.userId === car.ownerId)) {
                return Promise.all([carModel.findByIdAndDelete(carId)]);
            }
            throw new Error("Car with that id doesn't exist or you don't have permission to modify it!")
        })
        .then(([removedCar]) => {
            res.status(200).send({ "message": "Car deleted successfully!" })
            cloudinaryHelper.deleteOldCloudinaryPictures(removedCar.pictures);
        })
        .catch(next);
};

module.exports = {
    getMyCars,
    getCar,
    addCar,
    editCar,
    deleteCar
};