
const ex = require("express");
const app = ex();
const path = require("path");
app.use(ex.static(__dirname+"/public"));
app.get("/",function(req,res){
    res.sendfile(path.join(__dirname,"public","index.html"));
});
app.listen(3000,function(req,res){
    console.log("server is running thanks");
});
 
