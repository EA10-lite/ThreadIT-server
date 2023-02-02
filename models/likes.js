const mongoose = require("mongoose");

const likes = new mongoose.Schema({
    liked_by: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

module.exports = likes;