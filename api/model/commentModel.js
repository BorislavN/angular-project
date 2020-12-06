const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema({
    offerId: {
        type: ObjectId,
        ref: "Offer",
        required: true
    },
    authorId: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Comment", commentSchema);