const path = require("path")
module.exports.home = function(req,res){
    res.sendFile(path.join(__dirname,"../public/index.html"));
}
module.exports.about = function(req,res){
    res.sendFile(path.join(__dirname,"../public/about.html"));
}
