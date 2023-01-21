
module.exports = function(){
    if(!process.env.JWT_PRIVATE_KEY){
        console.log("FATAL ERROR: No JWT KEY PROVIDED")
        process.exit(1);
    }
}