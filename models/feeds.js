const mongoose = require("mongoose");
const comments = require("./comments");
const likes = require("./likes");

const feeds = new mongoose.Schema({
    created_at: { type: Date, default: Date.now },
    created_by: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    caption: { type: String, minLength: 1, maxLength: 1024 },
    location: { type: String, minLength: 1, maxLength: 50 },
    media: [{ type: { type: String, required: true }, url: { type: String, required: true } }],
    comments: [comments],
    likes: [likes],
});

const Feeds = mongoose.model("Feed", feeds);

module.exports.Feeds = Feeds;