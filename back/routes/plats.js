var express=require('express')
var plats=express.Router();
const mongoClient=require('mongodb').MongoClient
var objectId=require('mongodb').ObjectId;
const constants=require('../constants');
const middlewares=require('../middlewares/middlewares')

mongoClient.connect(constants.url).then(client=>{
	const db=client.db("meandb")
	const collection=db.collection("plats")
	
	plats.get('/liste', middlewares.checkSession, middlewares.restaurantOnly, function(req, res){
		var restaurant=new objectId(req.session.user._id)
		res.redirect('/plats/carte/'+restaurant);
	})
		
	plats.get('/carte/:restaurant', function(req, res){
		var restaurant=req.params.restaurant;
		var carte=collection.find(
			{"restaurant.id": restaurant},
		)
		.toArray()
		.then(results=>{
			console.log(req.session.restaurant);
			res.send({status:1, data:results})
		}) 
		.catch(error=>{
			console.error(error)
		})
	})
	
	plats.post('/nouveau', middlewares.checkSession, middlewares.restaurantOnly, function(req, res){
		var restaurant={id:req.session.user._id, nom:req.session.user.nom}
		var plat=req.body;
		plat.restaurant=restaurant;
		collection.insertOne(plat)
		.then(result=>{
			if(result.acknowledged){
				res.send({status:1, message:"Plat enregistré", data:{inserted:result.insertedId}});
			}else{
				console.log("not inserter")
				res.send({status:0, message:"Il y eu une erreur"})
			}
		});
	})
	
	plats.get('/supprimer/:id_plat', middlewares.checkSession, middlewares.restaurantOnly, function(req,res){
		var stat=1; var msg="Modifications enregistrées";
		var plat=new objectId(req.params.id_plat);
		var resto_id=req.session.user._id;
		collection.deleteOne({_id: plat, "restaurant.id": resto_id})
		.then(result=>{
			if(result.acknowledged && !result.deletedCount==1){
				stat=0; msg="Il y a eu une erreur";
			}
			res.send({status:stat, message:msg})
		})
		.catch(error=>console.error(error))
	})
})
.catch(error=>console.error(error))

module.exports=plats;