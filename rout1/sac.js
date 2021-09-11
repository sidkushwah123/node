const exp= require("express");
const app= exp();
const bp=require("body-parser");
var mysql = require("mysql");

app.set('views','./view');
app.set('view engine','ejs');

app.use(bp.urlencoded({extended:true}));
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    pasword: "",
    database: "db1"

});

app.get("/",function(req,res){
    res.sendFile(__dirname+"/public/index.html");
});
app.get("/sgn",function(req,res){
    res.sendFile(__dirname+"/public/reg.html");
});
app.get("/lg",function(req,res){
    res.sendFile(__dirname+"/public/login.html");
});
app.post("/ch",function(req,res){
    let c=req.body.em;
    let PW=req.body.psw;
    con.connect(function(err){
        if(err) throw err;
        console.log("conected!");
        var sql = "INSERT INTO reg (username,password) VALUES ('"+c+"','"+PW+"')";
        con.query(sql,function(err,result){
            if(err) throw err;
            console.log("data inserted");

        });

    });
    res.send("data inserted");

});
app.post("/gg",function(req,res){
    let u=req.body.uname;
    let p=req.body.psw;
    con.connect(function(err){
        if(err) throw err;
        console.log("conected");
        var sql = "select* from reg where username = '"+u+"' and password ='"+p+"'";
        con.query(sql,function(err,result){
            if(err)throw err;
            else
            res.send("thank you");
        });
    });
});
var obj = {};
app.get("/list",function(req,res){
    con.connect(function(err){
        if(err) throw err;
        console.log("connected");
        var sql="SELECT * FROM reg";
        con.query(sql,function(err,result){
            if(err) throw err;
            else
            res.render('print',{data:result});

        });
    });
});
    


app.listen(5000,function(){
    console.log("server is running thanks");
});