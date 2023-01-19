require("express-async-errors");
require("dotenv").config();
const express = require("express");
const app = express();

require("./structure/validation")();
require("./structure/db")();
require("./structure/route")(app);


app.listen(process.env.LOCAL_PORT, ()=> {
    console.log("now listening at port", process.env.LOCAL_PORT);
})