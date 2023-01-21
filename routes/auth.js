const {
    login_shcema,
    register_schema,
    reset_password_mail_schema,
    reset_password_schema
} = require("../validators/auth");

const {
    login,
    register,
    reset_password,
    send_reset_password_mail, 
    verify_account
} = require("../controllers/auth");

const auth = require("../middlewares/auth");
const validator = require("../middlewares/validate");
const express  = require("express");
const router = express.Router();

router.get("/verify", auth, verify_account);
router.post("/login", validator(login_shcema), login)
router.post("/regiser", validator(register_schema), register);
router.post("/reset-password", validator(reset_password_mail_schema), send_reset_password_mail);
router.put("/reset-password", [ auth, validator(reset_password_schema) ], reset_password);

module.exports = router;