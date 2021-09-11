const ex = require("express");
const app = ex();
var unirest = require("unirest");

var req = unirest("GET", "https://myallies-breaking-news-v1.p.rapidapi.com/GetTopNews");

req.headers({
	"x-rapidapi-host": "myallies-breaking-news-v1.p.rapidapi.com",
	"x-rapidapi-key": "690ad04fd7mshe7a63a2f31acb07p1ad12bjsn64e35ece7220"
});
app.use(ex.static(__dirname+"/html pages"));
app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"html pages","index.html"));
});

req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});
app.listen(1100,function(){
       console.log("server is running");
});