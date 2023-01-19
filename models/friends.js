
const mongoose = require("mongoose");

const friend_schema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

module.exports.friend_schema = friend_schema;