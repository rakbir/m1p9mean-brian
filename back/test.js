var express=require("express");
var middlewares=require('./session/middlewares')
const database=require('./constants').database
const mongoClient=require('mongodb').MongoClient
var app=express();
const bodyparser=require('body-parser')

var cookieParser=require('cookie-parser')

app.use(cookieParser())
app.use(middlewares.checkCookies)

app.get('/', function(req, res){
	res.send("root")
});

app.get('/affichage', function(req, res){
	res.send("affichage")  
})

app.get('/root', function(req, res){
	res.send("root")  
})
app.listen(3000);
console.log("server démarré")	
