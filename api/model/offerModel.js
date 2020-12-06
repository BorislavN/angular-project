const mongoose = require('mongoose');
const commentModel = require("./commentModel");
const { ObjectId } = mongoose.Schema.Types;

const offerSchema = new mongoose.Schema({
    carId: {
        type: ObjectId,
        ref: "Car",
        required: true,
        unique: true
    },
    authorId: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

offerSchema.pre("deleteOne", { document: true, query: false }, function (next) {
    commentModel.deleteMany({ offerId: this._id }, (err) => {
        if (err) {
            next(err);
        }
    });
    next();
});

module.exports = mongoose.model("Offer", offerSchema);