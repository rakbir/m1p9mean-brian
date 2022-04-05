
const mongoClient=require('../DbConnect')

module.exports={
	checkSessionCookie: function(req, res, next){
		if(req.cookies['SID']){
			next()
		}else{
			res.send(404, "Veuillez-vous connecter s'il vous plaît")
		}
	},	
	checkSession: function(req, res, next){
		if(req.session.utilisateur){
			next()
		}else{
			res.send(404, "Veuillez-vous connecter s'il vous plaît")
		}
	},
	adminOnly: function(req, res, next){
		if(req.session.type=="admin"){
			next()
		}else{
			res.send(404,"Veuillez-vous connecter s'il vous plaît")
		}
	},
	clientOnly: function(req, res, next){
		if(req.session.type="client"){
			next()
		}else{
			res.send(404,"Veuillez-vous connecter s'il vous plaît")
		}
	},
	restaurantOnly: function(req, res, next){
		if(req.session.type=="restaurant"){
			next()
		}else{
			res.send(404,"Veuillez-vous connecter s'il vous plaît")
		}
	}
}

