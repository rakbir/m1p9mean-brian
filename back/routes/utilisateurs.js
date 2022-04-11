var express=require('express')
var utilisateurs=express.Router();
const mongoClient=require('mongodb').MongoClient
const constants=require('../constants');
var bcrypt = require("bcryptjs");

mongoClient.connect(constants.url)
.then(client=>{
	const db=client.db("meandb")
	const collection=db.collection("utilisateurs")
	
	utilisateurs.get("/session-user/:profil", function(req, res){
		var profil=req.params.profil;
		if(req.session.user && req.session.user.type==profil){
			var user=req.session.user; 
			res.send({status:1, data:user}) 
		}else{
			res.send({status:0, message:"Aucune session utilisateur"});
		}
	})
	
	utilisateurs.post('/inscription', function(req, res){
		var stat=1;
		var msg="Inscription terminée avec succès";
		req.body.mdp=bcrypt.hashSync(req.body.mdp, 8);
		collection.insertOne(req.body)
		.then(result=>{
			if(!result.acknowledged){
				stat=0;
				msg="Il y a eu un problème"
			}
		});
		res.send({status:stat, message:msg})
	}) //OK
	
	utilisateurs.post('/login', function(req, res){
		var stat=1; 
		collection.findOne({mail:req.body.mail, type:req.body.type})
		.then(result=>{
			if(result!=null){
				if(bcrypt.compareSync(req.body.mdp, result.mdp)){
					delete result.mdp;
					req.session.user=result;
					res.send({status:1, data:result})
				}else{
					res.send({message:"La combinaison des identifiants ne correspond à aucun compte", status:0})
				}
			}else{
				res.send({message:"Compte non trouvé", status:0})
			}
		})
	});
	
	
	utilisateurs.get('/deconnexion', function(req, res){
		req.session.destroy();
		res.send({status:1, message:'Session terminée'});
	});
})
.catch(error=>console.error(error))

module.exports=utilisateurs;