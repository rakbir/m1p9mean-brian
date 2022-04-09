var express=require('express')
var plats=express.Router();
const mongoClient=require('mongodb').MongoClient
var objectId=require('mongodb').ObjectId;
const constants=require('../constants');
const middlewares=require('../middlewares/middlewares')


mongoClient.connect(constants.url).then(client=>{
	const db=client.db("meandb")
	const collection=db.collection("utilisateurs")
	
	plats.get('/carte/:restaurant', function(req, res){
		var restaurant=new objectId(req.params.restaurant);
		var carte=collection.findOne(
			{_id: restaurant},
			{
				projection: { nom:1, plats:1}
			})
			.then(result=>{
				if(result==null){
					res.send({status:0, message:"Contenu introuvable"})
				}
				result.plats=result.plats ? result.plats : [];
				res.send({status:1, data:result})
			}) 
			.catch(error=>{
				console.error(error)
			})
	})
	
	plats.put('/nouveau', middlewares.checkSession, function(req, res){
		var restaurant=new objectId(req.body.restaurant_id)
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