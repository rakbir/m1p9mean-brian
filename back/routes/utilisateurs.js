var express=require('express')
var utilisateurs=express.Router();
const mongoClient=require('mongodb').MongoClient
const constants=require('../constants');

mongoClient.connect(constants.url)
.then(client=>{
	const db=client.db("meandb")
	const collection=db.collection("utilisateurs")
	
	utilisateurs.get("/session", function(req, res){
		var user={}
		if(req.session.user){
			user=req.session.user
		}
		console.log("get the session:", req.session)
		res.send(user);
	})
	
	utilisateurs.post('/login', function(req, res){
		collection.findOne(req.body)
		.then(result=>{
			if(result==null){
				return res.status(404).send({message:"La combinaison des identifiants ne correspond à aucun compte"})
			}else{
				req.session.user=result
				message="ok";
				statusOp=1;
			}
			console.log("set the session: ", req.session)
			res.send({message:message, status:statusOp})
		})
	});
	
	// utilisateurs.get('/deconnexion', function(req, res){
			
	// });
	
	utilisateurs.post('/inscription', function(req, res){
		collection.insertMany(
		[
		{
			nom:"Resto galasam",
			adresse:"Ambatofotsy ambadiky ny gara",
			description:"sakafo malagasy",
			type:"resto",
			mail:"restogalasam@gmail.com",
			mdp:"123456"
		},
		{
			nom:"Gasy kaly",
			adresse:"Ambany sapin",
			type:"resto",
			mail:"gkaly@gmail.com",
			mdp:"123456"
		},
		{
			nom:"Resto galasam",
			adresse:"Ambatofotsy ambadiky ny gara",
			type:"resto",
			mail:"restogalasam@gmail.com",
			mdp:"123456"
		},
		{
			nom:"Rakoto",
			prenom:"Jean",
			type:"livreur",
			mail:"jrak@gmail.com",
			mdp:"123456"
		}
		])
		res.send("inscription terminée")
	})
})
.catch(error=>console.error(error))


module.exports=utilisateurs;