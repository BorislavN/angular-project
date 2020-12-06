const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);