const mongoose = require("mongoose");

module.exports = function(){
    mongoose.connect("mongodb://localhost/thread-it")
        .then(()=> console.log("connecting to mongodb..."))
        .catch(err => console.error("failed to connect to mongodb...", err))
}