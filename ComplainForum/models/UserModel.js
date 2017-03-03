var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
		_id : { type : Schema.ObjectId, auto : true },
		username : String,
		password : String,
		email : String,
		role: String,
		posts :[ Schema.Types.ObjectId]
},{ collection :'user' });

module.exports = mongoose.model('User', UserSchema);