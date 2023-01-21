const bcrypt = require("bcrypt");

const hash_password = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

const verify_password = async (password_a, password_b) => {
    return bcrypt.compare(password_a, password_b);
}

module.exports = {
    hash_password,
    verify_password
}