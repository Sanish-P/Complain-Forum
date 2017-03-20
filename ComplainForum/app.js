var express = require('express');

var session = require('express-session');

var bodyParser = require('body-parser');

var multer = require('multer');

var upload = multer();

var app = express();

var port = 9000

var path = require('path');

var viewPath = path.join(__dirname,'views/');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sanishDb');

app.use('/static', express.static('public'));


var userRouter = require('./routers/User.js');

var postRouter = require('./routers/Post.js');

var adminRouter = require('./routers/Dashboard.js');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extend : true }));

app.use(upload.array());

app.set('view engine','ejs');

app.use(session({
		secret: 'user',
		resave: false,
  		saveUninitialized: true,
}));


app.get("/",function(req,res){

	res.sendFile(viewPath + 'index.html');


});

app.use('/Users',userRouter);

app.use('/Posts',postRouter);

app.use('/Dashboard',adminRouter);

app.listen(port,function(){

		console.log('Server is running at '+ port);

});