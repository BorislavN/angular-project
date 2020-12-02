const { commentModel } = require("../model");

function getAllComments(req, res, next) {
    const { offerId } = req.params;

    commentModel.find({ offerId })
        .populate({
            path: "authorId",
            select: "-password"
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
        .then((newComment) => {
            res.status(201).json(newComment);
        })
        .catch(next);
};

module.exports = {
    getAllComments,
    addComment
};