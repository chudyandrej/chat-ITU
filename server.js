const PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var moment = require('moment');
var bodyParser = require('body-parser');
var _ = require('underscore');


var db = require('./db.js');
var middleware = require('./middleware.js')(db);


app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('ITU chat');
});

app.get('/chat', middleware.requreAuthentification ,function(req, res) {
    res.json(req.user);
});

app.post('/join', function(req, res) { //reg user to portal
    var body = _.pick(req.body, 'name', 'email', 'password');
    db.user.create(body).then(function(user) {
        res.json(user.toPublicJSON());
    }, function(e) {
        res.status(400).json(e);
    });
});

app.post('/login', function(req, res) { //reg user to portal
    let body = _.pick(req.body, 'email', 'password');
	var userInstance;

    db.user.authenticate(body).then((user) => {
		userInstance = user;
		let token = user.genetateToken('authentication');
		console.log('\n\nGenerate token :', token);
		return db.token.create({
			token
		});
    }).then((tokenInstance)=>{
		res.header('Auth', tokenInstance.token).json(userInstance.toPublicJSON());
	}).catch((e)=>{
		res.status(401).json(e);
	});
});

db.sequelize.sync({
    //force: true
}).then(() => app.listen(PORT, function() {
    console.log('Express listening on port ' + PORT + '!');
}));
