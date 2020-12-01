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
    }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model("Comment", commentSchema);