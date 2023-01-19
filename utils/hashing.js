const bcrypt = require("bcrypt");

const hash_password = async (password) => {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(password, salt);
}

const verify_password = async (pass_entered, pass_stored) => {
    return bcrypt.compare(pass_entered, pass_stored);
}

module.exports ={
    hash_password,
    verify_password
}