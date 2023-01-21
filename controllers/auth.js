const { User } = require("../models/users");
const { hash_password, verify_password } = require("../utils/hashing");
const transport = require("../utils/transport");
const _ = require("lodash");
const jwt = require("jsonwebtoken");


const login = async (req, res) => {
    const user = await User.findOne({ username: req.body.usernam });
    if(!user) return res.status(404).send({ error: "Invalid username and password!" });

    const is_valid_password = await verify_password(req.body.password, user.password);
    if(!is_valid_password) return res.status(400).send({ error: "Incorrect password." });

    const token = user.generateAuthToken();

    res.status(200).send({
        token,
        error: null,
        message: "Login successful."
    });
}

const register = async (req, res) => {
    let user = await User.findOne().or([{ email: req.body.email },{ username: req.body.username }])
    if(user) return res.status(400).send({ error: "username or email already exist!" });

    user = new User(req.body);
    user.password = await hash_password(user.password);
    await user.save();

    const token = jwt.sign({ email: user.email }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h'});
    const mail_options = {
        from: process.env.GMAIL_USERNAME,
        to: user.email,
        subject: 'Password Reset',
        html: `<p>Please click <a href="http://localhost:3000/account-verify/${token}">here</a> to verify your account.</p>`,
    };

    await transport.sendMail(mail_options);

    res.status(201).send({
        data: _.pick(user, ['username', 'name']),
        error: null,
        message: "Registration successful."
    });
}

const reset_password = async (req, res) => {
    const user = await User.findById(req.user.email);
    if(!user) return res.status(404).send({ error: "User not found" });

    user.password = await hash_password(req.body.password);
    await user.save();

    res.status(200).send({
        error: null,
        message: "Password updated successful."
    });
}

const send_reset_password_mail = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(404).send({ error: "user with email not found." });

    const token = jwt.sign({ email: req.body.email}, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h'});
    const mail_options = {
        from: 'emanuelanyigor@gmail.com',
        to: email,
        subject: 'Password Reset',
        html: `<p>Please click <a href="http://localhost:3000/reset-password/${token}">here</a> to reset your password.</p>`,
    };

    await transport.sendMail(mail_options);

    res.status(200).send({
        error: null,
        message: "A verification email has been sent to your email address."
    });
}

const verify_account = async (req, res) => {
    const user = await User.findOneAndUpdate({ email: req.user.email }, { $set: {
        is_verified: true 
    }}, { new: true });
    if(!user) return res.status(404).send({ error: "user with email not found." });

    res.status(200).send({
        error: null,
        message: "Account verification successful."
    });
}

module.exports = {
    login,
    register,
    reset_password,
    send_reset_password_mail,
    verify_account,
}