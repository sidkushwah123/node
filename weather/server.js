// JavaScript Document
var express = require('express')
var request = require('request')
var app = express();
var bp = require('body-parser')
var city='new delhi';
app.use(bp.urlencoded({extended:true}));


app.set('views','view')
app.set('view engine','ejs')



app.get('/',function(req,res){
	var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=9310c5d9e77983f78fa73e88af1140e1`;

	request(url,function(error,response,body){
		
		weather_json = JSON.parse(body)
		var weather={
			city:city ,
			temperature:weather_json.main.temp,
			description:weather_json.weather[0].description,
			icon:weather_json.weather[0].icon
	
			}
			
		var weather_data={weather:weather};
		
		res.render('weather',weather_data)
});
});
	app.post('/city',function(req,res){
	  city =req.body.t1;
      url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=9310c5d9e77983f78fa73e88af1140e1`;

	request(url,function(error,response,body1){
		
		weather_json = JSON.parse(body1)
		var weather={
			city:city ,
			temperature:weather_json.main.temp,
			description:weather_json.weather[0].description,
			icon:weather_json.weather[0].icon
	
			}
			
		var weather_data={weather:weather};
		
		res.render('weather',weather_data)
		
		});
	
	});


app.listen(8000)