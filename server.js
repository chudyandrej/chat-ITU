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



function getArrayOnlienUsers(){
    let response = [];
    for(let userId of Object.keys(onlineUser)){
        let user = onlineUser[userId];
        response.push({
            id : userId,
            name: onlineUser[userId].name
        });
    }
    return response;
}

app.get('/test', function (req, res) {
     res.sendFile(__dirname+ '/photos/images.jpeg');
});



io.on('connection', function(socket) {
   
    socket.on('join', function(message) {
        console.log("Registration")
        db.users.create(message).then((userInstance) =>{
            onlineUser[userInstance.get('id')] = {
                name: userInstance.get('name'),
                socket,
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
                name: userInstance.get('name'),
                socket,
                rooms : []
            }

            socket.emit('loginAllowed', {
                result: true,
                name: userInstance.get('name'), 
                id:userInstance.get('id')
            });
            io.emit('getUsers' , getArrayOnlienUsers());

        }, (error) => {
             socket.emit('loginAllowed', {
                result: false,
                message: error
            });
            
        });
    });

    socket.on('getUsers', function(message) {
        socket.emit('getUsers' , getArrayOnlienUsers());

    });

    socket.on('message', function(message) {
        for(userId of message.to){
            onlineUser[userId].socket.emit('message', message);
        }
        socket.emit('getUsers' , getArrayOnlienUsers());

    });



    socket.on('disconnect', function() {
        for(userId of Object.keys(onlineUser)){
            let user = onlineUser[userId];
            if (user.socket.id === socket.id){
                delete onlineUser[userId]
                break;
            }
       }
        io.emit('getUsers' , getArrayOnlienUsers());
    });
   


});

setInterval(function() {

    console.log(onlineUser);
}, 1000 * 2);


db.sequelize.sync({
    //force: true
}).then(function() {
    let server =  app.listen(PORT, function() {
        console.log('Express listening on port ' + PORT + '!');
    });
    http.listen(server, function() {
        console.log('Express listening on port ' + PORT + '!');
    });
   

});