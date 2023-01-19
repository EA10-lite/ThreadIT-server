const express = require("express");
const validate = require("../middlewares/validate");
const { login, register } = require("../controllers/auth");
const { login_schema, registration_schema } = require("../validators/auth");

const router = express.Router();

router.post("/login", validate(login_schema), login);
router.post("/register", validate(registration_schema), register);

module.exports = router;

