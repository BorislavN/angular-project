const { commentModel } = require("../model");

function getAllComments(req, res, next) {
    const { offerId } = req.params;

    commentModel.find({ offerId })
        .sort({ createdAt: -1 })
        .populate({
            path: "authorId",
            select: "username"
        })
        .then((comments) => {
            res.status(200).json(comments);
        })
        .catch(next);
};

function addComment(req, res, next) {
    const { offerId } = req.params;
    const { userId } = req.user;
    const { text } = req.body;

    commentModel.create({ offerId, authorId: userId, text })
        .then((data) => {
            return Promise.all([commentModel.find({ offerId })
                .sort({ createdAt: -1 })
                .populate({
                    path: "authorId",
                    select: "username"
                })]);
        })
        .then(([comments]) => {
            res.status(201).json(comments);
        })
        .catch(next);
};

module.exports = {
    getAllComments,
    addComment
};