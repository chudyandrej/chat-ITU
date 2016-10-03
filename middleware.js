cryptojs = require('crypto-js');
module.exports = function(db){
	return {
		requreAuthentification (req, res, next) {
			let token = req.get('Auth') || '';
            console.log('\nAuth token: ',token);
            console.log('\nEncrypt token: ', cryptojs.MD5(token).toString());
			db.token.findOne({
				where:{
					tokenHash: cryptojs.MD5(token).toString()
				}
			}).then(function (tokenInstance){
				if(!tokenInstance){
					throw new Error();
				}

				req.token = tokenInstance;
				return db.user.findByToken(token);
			}).then(function (user){
				req.user = user;
				next();
			}).catch(function (e) {
				res.status(401).json(e);
			});
		}
	};
};
