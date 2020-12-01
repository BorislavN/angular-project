const cookieName = process.env.AUTH_COOKIE_NAME;
const { jwtHelper } = require("../util");
const { userModel, blacklistTokenModel } = require("../model");

function registerUser(req, res, next) {
    const { username, email, password } = req.body;

    return userModel.create({ username, email, password })
        .then((newUser) => {
            res.status(201).send({
                message: `User ${newUser.username} registered successfully!`
            });
        })
        .catch(next);
};

function loginUser(req, res, next) {
    const { username, password } = req.body;

    userModel.findOne({ username })
        .then((user) => {
            return Promise.all(user, user ? user.comparePasswords(password) : false);
        })
        .then(([user, passMatch]) => {
            if (!passMatch) {
                throw new Error("Invalid username or password!");
            }
            const token = jwtHelper.createToken({ id: user._id });

            if (process.env.MY_NODE_ENV === 'production') {
                res.cookie(cookieName, token, { httpOnly: true, sameSite: 'none', secure: true });
            } else {
                res.cookie(cookieName, token, { httpOnly: true });
            }
            res.status(202).send({ message: `User: ${username} logged in successfully!` });
        })
        .catch(next);
};

function logoutUser(req, res, next) {
    const token = req.cookies[cookieName];

    blacklistTokenModel.create({ token })
        .then(() => {
            res.clearCookie(cookieName)
                .status(200)
                .send({ message: 'User logged out successfully!' });
        })
        .catch(next);
};

function getUserProfile(req, res, next) {
    const { userId } = req.user;

    userModel.findOne({ _id: userId })
        .then((user) => {
            const { _id, username, email, balance } = user;

            res.status(200).send({ id: _id, username, email, balance });
        })
        .catch(next);
};

function editUserProfile(req, res, next) {
    const { userId } = req.user;
    const { username, email, balance } = req.body;

    userModel.findOneAndUpdate({ _id: userId }, { balance, username, email }, { runValidators: true, new: true })
        .then((updated) => {
            res.status(200)
                .send({ message: `Values updated successfully - username=${updated.username} email=${updated.email} balance=${updated.balance}` });
        })
        .catch(next);
};

module.exports = {
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    editUserProfile,
};