var express=require("express");
var middlewares=require('./middlewares/middlewares')
const database=require('./constants').database
const mongoClient=require('mongodb').MongoClient
var app=express();
const bodyparser=require('body-parser')

var cookieParser=require('cookie-parser')

app.use(cookieParser())
// app.use(middlewares.checkCookies)

app.get('/', function(req, res){
	session=req.session;
	console.log(req.session)
	if(session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else{
		res.sendFile('views/index.html',{root:__dirname})
	}
});

app.post('/user', function(req, res){
	session=req.session;
	session.userid=req.body.username;
	console.log("/user", req.session)
	res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
})

app.get('/test', function(req, res){
	console.log("test ", req.session);
	res.send("salut")
})

app.get('/logout',function(req,res){
    req.session.destroy();
    res.redirect('/');
});

app.get('/affichage', function(req, res){
	res.send("affichage")  
})

app.get('/root', function(req, res){
	res.send("root")  
})
app.listen(3000);
console.log("server démarré")	
