module.exports={
	checkSession: function(req, res, next){
		if(req.session.user){
			next()
		}else{
			res.send({status:2, message:"Veuillez-vous connecter s'il vous plaît"})
		}
	},
	responsableOnly: function(req, res, next){
		if(req.session.user.type=="responsable"){
			next()
		}else{
			res.send({status:3,message:"Accès refusé"})
		}
	},
	clientOnly: function(req, res, next){
		if(req.session.user.type=="client"){
			next()
		}else{
			res.send({status:3,message:"Accès refusé"})
		}
	},
	restaurantOnly: function(req, res, next){
		if(req.session.user.type=="restaurant"){
			next()
		}else{
			res.send({status:3,message:"Accès refusé"})
		}
	},
	livreurOnly:function(req, res, next){
		if(req.session.user.type=="livreur"){
			next()
		}else{
			res.send({status:3,message:"Accès refusé"})
		}
	}
}

