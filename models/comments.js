const mongoose = require("mongoose");

const comments = new mongoose.Schema({
    created_at: { type: Date, default: Date.now },
    comment: { type: String, minLength: 1, maxLength: 1024, required: true },
    comment_by: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    replies: [new mongoose.Schema({
        created_at: { type: Date, default: Date.now },
        comment: { type: String, minLength: 1, maxLength: 1024, required: true },
        comment_by: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    })]
});

module.exports = comments;