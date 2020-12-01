const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: String,
}, { timestamps: { createdAt: 'created_at' } });


module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);