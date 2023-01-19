
const { User } = require("../models/user");
const { hash_password, verify_password } = require("../utils/hashing");
const _ = require("lodash");
const async_middleware = require("../middlewares/async");

const login = async_middleware(async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if(!user) return res.status(400).send({ error: "Incorrect email and password!" });

    const is_valid_password = await verify_password(req.body.password, user.password);
    if(!is_valid_password) return res.status(400).send({ error: "Incorrect password!" });

    const token = user.generateAuthToken();

    res.status(200).send({
        token,
        error: null,
        message: "login successful!"
    });
});

const register = async_middleware(async (req, res) => {
    let user = await User.findOne().or([{ username: req.body.username }, { email: req.body.email }]);
    if(user) return res.status(400).send({ error: "Username or email already in use!" });

    user = new User(req.body);
    user.password = await hash_password(user.password);
    await user.save();

    const token = user.generateAuthToken();

    res.header('x-auth-token', token).status(201).send({
        data: {},
        error: null,
        message: "Registration successful"
    });
});


module.exports = {
    login,
    register
}