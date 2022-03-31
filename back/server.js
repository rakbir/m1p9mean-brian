var express=require("express");
var app=express();
const bodyparser=require('body-parser')

const url=require('./constants').url;
var db=require('./DbConnect');

var clients=require('./routes/clients');
var restaurants=require('./routes/restaurants');
var commandes=require('./routes/commandes');
var utilisateurs=require('./routes/utilisateurs');
var plats=require('./routes/plats');

app.use(bodyparser.urlencoded({extended:true}))

app.use('/clients', clients); //toutes les url commençant par clients gérées par le module client
app.use('/restaurants', restaurants);
app.use('/commandes', commandes);
app.use('/utilisateurs', utilisateurs);
app.use('/plats', plats);

app.listen(3000);
console.log("server démarré")	
