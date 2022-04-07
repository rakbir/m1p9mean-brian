var express=require("express");
const bodyparser=require('body-parser')
const cookieParser=require('cookie-parser')
const session=require('express-session');
const cors=require('cors');
var app=express();
var clients=require('./routes/clients');
var restaurants=require('./routes/restaurants');
// var commandes=require('./routes/commandes');
var utilisateurs=require('./routes/utilisateurs');
var plats=require('./routes/plats');

app.use(cors({origin:true, credentials:true}))
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());
app.use(cookieParser());
const oneDay=24*3600000;
app.use(session({secret:'secretkey',saveUninitialized: true, resave: true, cookie:{maxAge:oneDay}}));
  
app.use('/clients', clients);
app.use('/restaurants', restaurants);
// app.use('/commandes', commandes);
app.use('/utilisateurs', utilisateurs);
app.use('/plats', plats);

// const constants=require('./constants')
// const mongoClient=require("mongodb").MongoClient
// app.get('/', function(req, res){
	// res.user={nom:"Rakotoaruisoa", prenom:"Brian"}
	// res.message="Attention"
	// res.code=12353
	// res.json({nom:"Rakoto", age:25})
	// console.log(res)
// })

// app.options('*', cors())

app.listen(3000);
console.log("server démarré sur le port 3000")	
