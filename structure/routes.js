const express = require("express");
const auth = require("../routes/auth");
const feeds = require("../routes/feeds");

module.exports = function(app){
    app.use(express.json());
    app.use("/api/auth", auth);
    app.use("/api/feeds", feeds);
}