const jwtHelper = require('./jwtHelper');
const authCookieName = process.env.MY_AUTH_COOKIE_NAME;
const { userModel, blacklistTokenModel } = require('../model');

function authUser() {
    return function (req, res, next) {
        const token = req.cookies[authCookieName] || '';

        Promise.all([
            jwtHelper.verifyToken(token),
            blacklistTokenModel.findOne({ token })
        ])
            .then(([payload, badToken]) => {
                if (badToken) {
                    return Promise.reject(new Error('token is blacklisted'));
                }
                userModel.findById(payload.userId)
                    .then(user => {
                        req.user = { "userId": user._id, "username": user.username, "email": user.email };
                        next();
                    });
            })
            .catch(err => {
                let tempError = new Error(err.message);

                if (['token expired', 'token is blacklisted', 'jwt must be provided'].includes(err.message)) {
                    tempError.message = `401${__delimiter}The token you are trying to use is invalid!`;
                }
                next(tempError);
            });
    };
}

module.exports = authUser;
