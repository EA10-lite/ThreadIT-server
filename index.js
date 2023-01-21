require("express-async-errors");
require("dotenv").config();
const express = require("express");
const error = require("./middlewares/error");

const app = express();
app.use(express.json());

require("./structure/config")();
require("./structure/db")();
require("./structure/validation")();
require("./structure/routes")(app);
app.use(error);


app.listen(process.env.PORT, ()=> {
    console.log("listening at port", process.env.PORT);
})