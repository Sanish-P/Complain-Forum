var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var PostSchema = new Schema({
	_id : { type : Schema.ObjectId ,auto :true},
	title : String,
	content : String,
	post_date : { type : Date , default : Date.now},
	last_access : {type : Date , default : Date.now},
	tags: String,
	author : { type : Schema.ObjectId , ref : 'User'},
}, { collection : 'post' });


module.exports = mongoose.model('Post',PostSchema);
