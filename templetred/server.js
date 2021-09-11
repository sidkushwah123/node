const ex = require("express");
const app = ex();
app.set('views','./view');
app.set('view engine','twig');
app.get('/', function (req, res) {
    res.render('index3', { title: 'Hey', name: ' sachin' })
  });
  app.listen(5000,function(req,res){
    console.log("server is running thanks");
});
