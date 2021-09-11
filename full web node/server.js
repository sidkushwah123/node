const ex = require("express");
const app = ex();
const path = require("path");
const bp = require("body-parser");
var mysql = require("mysql");
var session = require('express-session');

app.use(bp.urlencoded({extended:true}));
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"

});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(ex.static(__dirname+"/html pages"));
app.use(ex.static(__dirname+"/public"));


app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"html pages","index.html"));
});
app.get("/reg",function(req,res){
    res.sendFile(path.join(__dirname,"public","register.html"));
});
app.get("/lg",function(req,res){
    res.sendFile(__dirname+"/public/login.html");
});

app.post("/rm",function(req,res){
    let nm=req.body.nmr;
    let lnm=req.body.lnmr;
    let em=req.body.email;
    let pw=req.body.psw;
    con.connect(function(err){
        if(err) throw err;
        console.log("database connected");
        var sql = "INSERT INTO rg  (firstname,lastname,email,password) VALUES ('"+nm+"','"+lnm+"','"+em+"','"+pw+"')";
        con.query(sql,function(err,result){
            if(err) throw err;
            console.log("data-inserted");
        });
    });
    res.send("data-inserted");
});
app.post("/jj",function(req,res){
    var u=req.body.uname;
    var p=req.body.psw;
    if (u && p){
        con.query('select * from rg where email = ? and password = ?',[u ,p],function(err,reults,fields){
            if(reults.length>0){
                req.session.loggedin = true;
				req.session.email = u;
				res.redirect('/home');
            }
         else {
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});

app.get('/home', function(req, res) {
	if (req.session.loggedin) {
		res.send('Welcome back, ' + req.session.username + '!');
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});
app.listen(3000);