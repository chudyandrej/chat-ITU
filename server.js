var express = require('express');
var _ = require('underscore');
var db = require('./db.js');
var bcrypt = require('bcrypt');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cryptojs = require('crypto-js');

var PORT = process.env.PORT || 3000;


var onlineUser = {}

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

for (let i = 0; i < 7; i++){
    app.get('/' + i, function (req, res) {
        res.sendFile(__dirname+ '/photos/'+ i +'.jpg');
    });
}

app.post('/test' , function (req, res) {
    console.log(req);

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
            let errorMsg = error.errors[0].message + " -> " + error.errors[0].path;
            if (!error.errors[0].message || !error.errors[0].path) {
                errorMsg = error;
            }
            socket.emit('registerAllowed', {
                result: false,
                message: errorMsg
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
        console.log(message);
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
