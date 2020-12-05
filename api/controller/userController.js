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
                throw new Error(`401${__delimiter}Invalid username or password!`);
            }
            const token = jwtHelper.createToken({ userId: user._id });

            if (process.env.MY_NODE_ENV === 'production') {
                res.cookie(cookieName, token, { httpOnly: true, sameSite: 'none', secure: true });
            } else {
                res.cookie(cookieName, token, { httpOnly: true });
            }
            res.status(202).send({ "message": `User: ${username} logged in successfully!` });
        })
        .catch(next);
};

function logoutUser(req, res, next) {
    const token = req.cookies[cookieName];

    blacklistTokenModel.create({ token })
        .then(() => {
            res.clearCookie(cookieName)
                .status(200)
                .send({ "message": 'User logged out successfully!' });
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
    const { username, email } = req.body;

    userModel.findOneAndUpdate({ _id: userId }, { username, email }, { runValidators: true, new: true })
        .then((updated) => {
            res.status(200)
                .send({ "message": `Values updated successfully - username=${updated.username} email=${updated.email}` });
        })
        .catch(next);
};

function depositMoney(req, res, next) {
    const { transaction } = req.body;
    const { userId } = req.user;

    userModel.findById(userId)
        .then(result => {
            result.balance = (result.balance + (+transaction));
            result.save();

            res.status(200)
                .send({ "message": `Balance updated successfully - balance=${result.balance}` });
        })
        .catch(next);
};

function withdrawMoney(req, res, next) {
    const { transaction } = req.body;
    const { userId } = req.user;

    userModel.findById(userId)
        .then(result => {
            const tempBalance = (result.balance - (+transaction));

            if (tempBalance >= 0) {
                result.balance = tempBalance;
                result.save();

                res.status(200)
                    .send({ "message": `Balance updated successfully - balance: ${result.balance}` });
            }
            throw new Error(`400${__delimiter}You can't withdraw more founds than you have - balance: ${result.balance}`);
        })
        .catch(next);
};

module.exports = {
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    editUserProfile,
    depositMoney,
    withdrawMoney
};