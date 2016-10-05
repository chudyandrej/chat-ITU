var express = require('express');
var _ = require('underscore');
var db = require('./db.js');
var bcrypt = require('bcrypt');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var PORT = process.env.PORT || 3000;
var todos = [];

app.use(express.static(__dirname + '/public'));

function checkTokenValidity(token) {
    return new Promise(function(resolve, reject) {
        db.token.findOne({
            where: {
                tokenHash: cryptojs.MD5(token).toString()
            }
        }).then(function(tokenInstance) {
            if (!tokenInstance) {
                reject();
            }
            resolve(tokenInstance);
        }, function(e) {
            reject(e);
        });
    });
}

io.on('connection', function(socket) {

    socket.on('join', function(message) { //reg user to portal
        var body = _.pick(message, 'name', 'email', 'password');
        db.user.create(body).then(function(user) {
            //TODO emit message
        }, function(e) {
            //TODO emit error message
        });
    });

    soket.on('login', function(message) { //reg user to portal
        var body = _.pick(message, 'email', 'password');
        var userInstance;

        db.user.authenticate(body).then(function(user) {
            userInstance = user;
            var token = user.genetateToken('authentication');

            return db.token.create({
                token
            });
        }).then(function(tokenInstance) {
            //TODO send OK status, token
        }).catch(function(e) {
            //TODO send error status
        });
    });

    soket.on('logout', function(message) {
        checkTokenValidity(message.token).thrn(function(tokenInstance) {
            tokenInstance.destroy().then(function() {
                //TODO sucessful
            }, function() {
                //TODO unsucessful
            });
        });
    });

    socket.on('disconnect', function() {
        //TODO
    });

});


db.sequelize.sync({
    //force: true
}).then(function() {
    app.listen(PORT, function() {
        console.log('Express listening on port ' + PORT + '!');
    });
});
