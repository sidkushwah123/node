const ex = require("express");
const app = ex();
const path = require("path");
const bp = require("body-parser");
var mysql = require("mysql");
var session = require('express-session');


app.set('views','./view');
app.set('view engine','ejs');

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


app.use(ex.static(__dirname+"/public"));
app.use(ex.static(__dirname+"/admin"));
app.use(ex.static(__dirname+"/view"));


app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"public","index.html"));
});
app.get("/reg",function(req,res){
    res.sendFile(path.join(__dirname,"public","register.html"));
});
app.get("/lg",function(req,res){
    res.sendFile(__dirname+"/public/login.html");
});
app.get("/admin",function(req,res){
    res.sendFile(path.join(__dirname,"admin","admin.html"));
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
        con.query('SELECT * FROM rg WHERE email = ? and password = ?',[u ,p],function(err,results,fields){
            if(results.length>0){
                req.session.loggedin = true;
				req.session.email = results;
				res.redirect('/home');
            }
            else
            {
                res.send('Incorrect Username and/or Password!');
        }
            		
			res.end();
		});
 }
    
 
});
var obj={};
app.post("/adm",function(req,res){
    var u=req.body.uname;
    var p=req.body.psw;
    if (u && p){
        con.query('SELECT * FROM admin WHERE email = ? and password = ?',[u ,p],function(err,results,fields){
            if(results.length>0){
                req.session.loggedin = true;
                req.session.email = u;
                obj = results;
                res.render('admin-d',{name:"obj.name"} );
            }
            else
            {
                res.send('Incorrect Username and/or Password!');
        }
            		
			res.end();
		});
 }
    
 
});
app.get("/home",function(req,res){
    res.sendFile(path.join(__dirname,"public","index.html"));
});
app.get("/list",function(req,res){
    var sql ="SELECT* FROM rg";
    con.query(sql,function(err,result){
        if(err)throw err;
        else
        res.render('list',{data:result});
    });
});


app.listen(5000);