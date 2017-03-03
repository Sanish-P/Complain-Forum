var express = require('express');

var path = require('path');

var userRouter = express.Router();

var modelPath = path.join(__dirname,'../models/');

var User = require(modelPath + "UserModel.js");

userRouter.get('/',function(req,res){

	if(req.query.username != ''){
		User.find(req.query,function(err,data ){

			if(err){
				console.log(err);
				res.send("Error");
			}
			else{
				res.json(data);
			}
		});

	}
	else{

		User.find(function(err ,data){

			if(err)
				res.send("Error");
			else
				res.json(data)

		});
	}

});

userRouter.post('/',function(req,res){

	var userInfo = req.body;

	var user = new User();

	user.username = userInfo.username;

	user.email = userInfo.email;

	user.password = userInfo.password;

	if(req.query.role == "admin"){
		user.role="admin";
	}
	else{

		user.role="user";
	}

	user.save(function(err,data){
		if(err){
			console.log(err);
			res.send(err);
		}
		else
			res.send("Account created Successfully.Please Login to begin");

	});
});

userRouter.get('/:id',function(req,res){

	console.log("You are at GET by Id");

	User.findById(req.params.id, function(err, data){

			if(err)
				res.send("Problem with get");
			else{
				var user = new User();
					user.username = data.username;
					user.email = data.email;
					user.posts = data.posts;
				res.json(user)
			}

	});
});

userRouter.get('/',function(req, res){
	
	User.find(req.params.username,function(err,data ){

			if(err){
				console.log(err);
				res.send("Error");
			}
			else{
				res.json(data);
			}
	});
});

userRouter.post('/:id',function(req , res){

		console.log("Server at Put");

	User.findByIdAndUpdate(req.params.id,req.body, function(err,data){

		if(err){
			console.log(err)
			res.send("Error");
		}
		else
			res.redirect("/Dashboard/Users");
	});

});

userRouter.delete('/:id',function(req,res){

	console.log("You are at delete");
	
	User.findByIdAndRemove(req.params.id,function(err, data){

		if(err){
			console.log(err);
		}
		else
			res.send("Success");

	});


});


module.exports = userRouter;