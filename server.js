const PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var moment = require('moment');
var bodyParser = require('body-parser');
var _ = require('underscore');

var db = require('./db.js');


app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send('ITU chat');
});

app.get('/chat', function(req, res){
	res.send('Private');
});

app.post('/join', function(req, res) {			//reg user to portal
	var body = _.pick(req.body,'name', 'email', 'password');
	db.user.create(body).then(function(user) {
		res.json(user.toPublicJSON());
	}, function(e) {
		res.status(400).json(e);
	});
});


db.sequelize.sync({
	force: true
}).then(()=> app.listen(PORT, function(){
	console.log('Express listening on port ' + PORT + '!');
}));
