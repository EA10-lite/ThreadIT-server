
module.exports = function(req, res, next){

    res.status(500).send({ error: "Something failed." });
}