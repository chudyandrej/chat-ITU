var bcrypt = require('bcrypt');
var _ = require('underscore');
var cryptojs = require('crypto-js');
var jwt = require('jsonwebtoken');




module.exports = function(sequelize, DataTypes) {
    var users = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 15]
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password_hash: {
            type: DataTypes.STRING
        },
        //never store to database but we can set funcionality
        password: {
            type: DataTypes.VIRTUAL,
            allowNull: false,
            validate: {
                len: [7, 50]
            },
            set: function(value) {
                var salt = bcrypt.genSaltSync(10);
                var hashedPassword = bcrypt.hashSync(value, salt);

                this.setDataValue('password', value);
                this.setDataValue('password_hash', hashedPassword);
            }
        },
    }, {
        hooks: {
            beforeValidate: function(user, options) {
                if (typeof user.email == 'string') {
                    user.email = user.email.toLowerCase();
                }
            }
        },
        classMethods: {
            authenticate: function(body) {
                return new Promise(function(resolve, reject) {

                    if (!_.isString(body.email) || !_.isString(body.password)) {
                        return reject("Email or password is not string!");
                    }
                    users.findOne({
                        where: {
                            email: body.email
                        }
                    }).then(function(user) {
                        if (!user || !bcrypt.compareSync(body.password, user.get('password_hash'))) {
                            return reject("Authentification has failed!");
                        }
                        resolve(user);

                    }, function(e) {
                        return reject(e);
                    });
                });
            },

            findByToken: function(token) {
                return new Promise(function(resolve, reject) {
                    try {
                        var decodedJWT = jwt.verify(token, 'qwery09856');
                        var bytes = cryptojs.AES.decrypt(decodedJWT.token, 'abc123!@#!');
                        var tokenData = JSON.parse(bytes.toString(cryptojs.enc.Utf8));
                        users.findById(tokenData.id).then(function(user) {
                            if (user) {
                                resolve(user);
                            } else {
                                reject();
                            }
                        }, function() {
                            reject();
                        });
                    } catch (e) {
                        console.log(e);
                        reject();
                    }
                });
            }
        },
        instanceMethods: {
            toPublicJSON: function() {
                var json = this.toJSON();
                return _.pick(json, 'id', 'email', 'createAt', 'updatedAt');
            },
            genetateToken: function(type) {
                if (!_.isString(type)) {
                    return undefined;
                }
                try {
                    var stringDATA = JSON.stringify({
                        id: this.get('id'),
                        type: type
                    });
                    var enctyptedData = cryptojs.AES.encrypt(stringDATA, 'abc123!@#!').toString();
                    var token = jwt.sign({
                        token: enctyptedData
                    }, 'qwery09856');
                    return token;


                } catch (e) {
                    console.log(e);
                    return undefined;
                }
            }
        }
    });

    return users;
};
