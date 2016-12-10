var Sequelize = require('sequelize')
var sequelize = new Sequelize('mysql://chat_iis:chatiishesozam@mysql51.websupport.sk:3309/chat_iis');
sequelize.authenticate().then(function(err) {
    console.log('Connection has been established successfully.');
}, function(err) {
    console.log('Unable to connect to the database:', err);
});



var db = {};


db.users = sequelize.import(__dirname + '/models/user.js');
db.token = sequelize.import(__dirname + '/models/token.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
