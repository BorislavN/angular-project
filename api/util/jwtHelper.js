const jwt = require('jsonwebtoken');
const secret = process.env.MY_JWT_SECRET;

function createToken(data) {
    return jwt.sign(data, secret, { expiresIn: '12h' });
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}

module.exports = {
    createToken,
    verifyToken
}