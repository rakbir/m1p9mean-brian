var express=require('express')
var plats=express.Router();
var bodyParser=require('body-parser')
const mongoClient=require('mongodb').MongoClient
var objectId=require('mongodb').ObjectId;
const constants=require('../constants');
const middlewares=require('../middlewares/middlewares')
// plats.use(bodyParser.urlencoded({ extended: false }))
// plats.use(bodyParser.json());


mongoClient.connect(constants.url).then(client=>{
	const db=client.db("meandb")
	const collection=db.collection("utilisateurs")
	
	plats.get('/liste/:restaurant', function(req, res){
		var restaurant=new objectId(req.params.restaurant)
		collection.find({_id: restaurant}, {plats}).toArray()
		.then(results=>{
			res.send(results)
		})
		.catch(error=>{
			console.error(error)
		})
	})
	
	plats.put('/nouveau', middlewares.checkSessionCookie, function(req, res){
		var restaurant=new objectId(req.body.restaurant)
		delete req.body.restaurant;
		var plat=req.body;
		collection.findOneAndUpdate(
		{_id:restaurant},
		{
			$push:{
				plats:plat
			}
		})
		.then(results=>{
			res.send(results)
		})
		.catch(error=>console.error(error))
	})

})
.catch(error=>console.error(error))

module.exports=plats;