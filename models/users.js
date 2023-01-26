const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const friend_schema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
})

const user = new mongoose.Schema({
    created_at: { type: Date, default: Date.now },
    avatar: { type: String, default: '' },
    bio: { type: String, default: '', maxLength: 1024 },
    cover_photo: { type: String, default: '' },
    email: { type: String, minLength: 5, maxLength: 50, required: true, unique: true },
    friends: [friend_schema],
    location: { type: String, default: '' },
    is_verified: { type: Boolean, default: false },
    name: { type: String, minLength: 5, maxLength: 255, required: true },
    password: { type: String, minLength: 8, maxLength: 1024, required: true },
    username: { type: String, minLength: 4, maxLength: 50, required: true, unique: true },
});

user.methods.generateAuthToken = function(){
    return jwt.sign({ _id: this._id, username: this.username }, process.env.JWT_PRIVATE_KEY);
}

const User = mongoose.model("User", user);

module.exports = {
    User,
}