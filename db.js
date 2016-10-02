var Sequelize = require('sequelize');       //load sequelize library (it work whit database)
var enviroment = process.env.NODE_ENV || 'development';     //load enviroment where application running (localhost or heroku)
var sequelize;

if (enviroment === 'production'){      //application run on heroku
	sequelize = new Sequelize(process.env.DATABASE_URL ,{
		dialect: 'postgres'
	});
}else{          //application run on localhost
	sequelize = new Sequelize(undefined, undefined, undefined, {
    	'dialect': 'sqlite',
    	'storage': __dirname + '/data/dev-todo-api.sqlite'
	});
}

var db = {};    // DB model
db.user = sequelize.import(__dirname + '/models/user.js');
db.token = sequelize.import(__dirname + '/models/token.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
