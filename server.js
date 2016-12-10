var express = require('express');
var _ = require('underscore');
var db = require('./db.js');
var bcrypt = require('bcrypt');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cryptojs = require('crypto-js');

var PORT = process.env.PORT || 3000;

var onlineUser = {};


app.use(express.static(__dirname + '/public'));


io.on('connection', function(socket) {
    console.log("New socket");
    socket.on('join', function(message) {
        db.users.create(message).then((instanceUser) =>{
            onlineUser[userInstance.get('id')] = {
                socektId : socket,
                rooms : []
            }
            mapingSocToUsers[socket.id] = userInstance.get('id');
            socket.emit('loginAllowed', true);
        }, (error) => {
            socket.emit('loginAllowed', false);
        });


    });

    socket.on('login', function(message) {
        console.log("Login");
        console.log(message);
        db.users.authenticate(message).then((userInstance) => {
            onlineUser[userInstance.get('id')] = {
                socektId : socket,
                rooms : []
            }
            mapingSocToUsers[socket.id] = userInstance.get('id');

            socket.emit('loginAllowed', true);

            //TODO emit login successful
        }, (error) => {
             socket.emit('loginAllowed', false);

            //TODO emit login unsuccessful
        });
    });

    socket.on('disconnect', function() {
        for(userId of Object.keys(onlineUser)){
            let user = onlineUser[userId];
            if (user.socket.id === socket.id){
                delete onlineUser[userId]
                break;
            }
       }
    });


});


db.sequelize.sync({
    //force: true
}).then(function() {
    http.listen(PORT, function() {
        console.log('Express listening on port ' + PORT + '!');
    });
});
