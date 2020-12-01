const mongoose = require('mongoose');
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
    }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model("Offer", offerSchema);