const { friend_schema }= require("./friends");
const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const user = new mongoose.Schema({
    created_at: { type: Date, default: Date.now },
    avatar: {
        type: String,
        validate: {
            validator: function(value) {
                return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(value);
            },
            message: '{VALUE} is not a valid URL!'
        }
    },
    bio: { type: String,  minLength: 20, maxLength: 1024 },
    cover_photo: {
        type: String,
        validate: {
            validator: function(value) {
                return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(value);
            },
            message: '{VALUE} is not a valid URL!'
        }
    },
    city: { type: String },
    country: { type: String },
    date_of_birth: { type: Date },
    email: { type: String, minLength: 5, maxLength: 255, required: true, unique: true },
    friends: [ friend_schema ],
    name: {
        type: String,
        minLength: 5, 
        maxLength: 255,
        required: true,
        validate: {
            validator: function(value) {
                return value.split(" ").length > 1;
            },
            message: 'Name must contain both first and last name'
        }
    }, 
    password: { type: String, minLength: 8, maxLength: 1024, required: true },
    username: { type: String, minLength: 3, maxLength: 50, required: true, unique: true }
});

user.methods.generateAuthToken = function(){
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
}

const User = mongoose.model("User", user);

module.exports.User = User;