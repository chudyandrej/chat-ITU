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
   
    socket.on('join', function(message) {
        console.log("Registration")
        db.users.create(message).then((userInstance) =>{
            onlineUser[userInstance.get('id')] = {
                socektId : socket,
                rooms : []
            }
            
            socket.emit('registerAllowed', {
                 result: true
            });
        }, (error) => {
            console.log(error);
            socket.emit('registerAllowed', {
                result: false,
                message: error
            });
        });


    });

    socket.on('login', function(message) {
        console.log("Login");
        console.log(message);
        db.users.authenticate(message).then((userInstance) => {
            onlineUser[userInstance.get('id')] = {
                socket,
                rooms : []
            }

            socket.emit('loginAllowed', {
                result: true
            });

        }, (error) => {
             socket.emit('loginAllowed', {
                result: false,
                message: error
            });
            
        });
    });

    socket.on('getUsers', function(message) {
        console.log("GetUsers");
        console.log(message);

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
    console.log("New socket");


});


setInterval(function() {

    console.log(onlineUser);
}, 1000 * 2);


db.sequelize.sync({
    //force: true
}).then(function() {
    http.listen(PORT, function() {
        console.log('Express listening on port ' + PORT + '!');
    });
});
