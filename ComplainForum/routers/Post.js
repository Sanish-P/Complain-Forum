var express = require('express');

var postRouter = express.Router();

var path = require('path');

var modelPath = path.join(__dirname,'../models/');

var Post = require(modelPath + "PostModel.js");


postRouter.get('/',function(req,res){

	Post.find(function(err, data){

		if(err){
			console.log(err);
			rs.send(err);
		}
		else
			res.send(data);
	});

});

postRouter.post('/',function(req,res){

	//console.log(req);

	var post = new Post();

	post.title = req.body.title;

	post.content = req.body.content;

	post.author = req.body.author;

	console.log(post);

	post.save(function(err,data){

		if (err){
			console.log(err)
			res.send(err);
		}
		else
			res.send('Success');
	});

});

postRouter.get('/:id',function(req,res){

		Post.findById(req.params.id,function(err,data){

			if(err){
				console.log(err);
				res.send('Error with Insert');
			}
			else
				res.send(data);
		});

postRouter.put('/:id',function(req,res){

	var post = new Post();

	post = req.query;

	Post.findByIdAndUpdate(req.params.id , post, function(err,data){

		if(err){
			console.log(err);

			res.send('Not Updated');
		}
		else
			res.send('Success');
	});
});

postRouter.delete('/:id', function(req,res){

	Post.findByIdAndRemove(req.params.id, function(err, data){

			if(err){
				console.log(err);

				res.send('Not deleted');
			}
			else
				res.send('Success');
	});

});


});



module.exports = postRouter;