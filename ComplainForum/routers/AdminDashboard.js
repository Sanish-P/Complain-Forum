var express = require('express');

var session = require('express-session');

var app = express();

var path = require('path');

var adRouter = express.Router();

var modelPath = path.join(__dirname,'../models/');

var viewPath = path.join(__dirname,'../views/');

var User = require(modelPath + "UserModel.js");

var Post = require(modelPath + "PostModel.js");

var currentSession;

adRouter.post('/',function(req , res){

	currentSession = req.session;

	User.findOne(req.body,function(err , data){

		if(err){
			console.log('Error is'+err);

		}
		else if(data == null){
			res.redirect('/');
		}
		else {
			currentSession.username = data.username;
			currentSession.userId = data._id;
			currentSession.userRole = data.role;
			res.redirect('/Dashboard')
		}

	});
});


adRouter.get('/',function(req, res){

	var postList = new Post();

	currentSession = req.session;

	if(currentSession.username==undefined){
		res.redirect('/');
	}
	else{

		Post.find(function(err, data){
			if(err)
				console.log(err);
			else{
				postList = data;
				

				if(currentSession.role =="admin"){

					res.render('Dashboard',{ username : currentSession.username, posts : postList });
				}
				else{

					res.render('UserHome',{ username : currentSession.username, posts : postList });
				}
			}

		});

	}

});

adRouter.get('/logout', function(req , res){

	req.session.destroy(function(err){
		if(err)
			console.log(err)
		else
			res.redirect('/');
	});


});

adRouter.get('/Users',function(req, res){

	currentSession = req.session;

	if(currentSession.username==undefined){
		res.redirect('/');
	}
	else{

		var userList = [];

		User.find(function(err, data){

			if(err)
				console.log(err)

			else{

				userList = data;
			
				res.render('DashboardUsers',{ username: currentSession.username , users : userList });

			}
		});
	}

});


module.exports = adRouter;