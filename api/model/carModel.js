const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const carSchema = new mongoose.Schema({
    pictures: {
        type: [{ url: String, id: String }],
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    miles: {
        type: Number,
        required: true
    },
    powertrain: {
        type: String,
        enum: ["Gasoline", "Diesel", "Hybrid", "Electric"],
        required: true
    },
    transmission: {
        type: String,
        enum: ["Manual", "Automatic"],
        required: true
    },
    ownerId: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    forSale: {
        type: Boolean,
        default: false,
        required: true
    }
});

module.exports = mongoose.model("Car", carSchema);