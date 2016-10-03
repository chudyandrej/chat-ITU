var bcrypt = require('bcrypt');
var _ = require('underscore');
var jwt = require('jsonwebtoken');
var cryptojs = require('crypto-js');

module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [3, 20]
            }
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
        password: {
            type: DataTypes.VIRTUAL,
            allowNull: false,
            validate: {
                len: [7, 50]
            },
            set(value) {
                let salt = bcrypt.genSaltSync(10);
                let hashedPassword = bcrypt.hashSync(value, salt);
                this.setDataValue('password', value);
                this.setDataValue('password_hash', hashedPassword);
            }
        }
    }, {
        hooks: {
            beforeValidate(user, options) {
                if (typeof user.email == 'string') {
                    user.email = user.email.toLowerCase();
                }
            }
        },
        classMethods: {
            authenticate(body) {
                return new Promise((resolve, reject) => {
                    if (!_.isString(body.email) || !_.isString(body.password)) {
                        return reject();
                    }

                    this.findOne({
                        where: {
                            email: body.email
                        }
                    }).then((user) => {
                        console.log('realy');
                        user && bcrypt.compareSync(body.password, user.get('password_hash')) ? resolve(user) : reject();
                    }, (e) => {
                        return reject();
                    });
                });
            },
            findByToken(token) {
                return new Promise((resolve, reject)=>{
                    try {
                        var decodedJWT = jwt.verify(token, 'qwery09856');
                        var bytes = cryptojs.AES.decrypt(decodedJWT.token, 'abc123!@#!');
                        var tokenData = JSON.parse(bytes.toString(cryptojs.enc.Utf8));
                        this.findById(tokenData.id).then(function(user) {
                            (user)? resolve(user) : reject();
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
            toPublicJSON() {
                var json = this.toJSON();
                return _.pick(json, 'id', 'email', 'createAt', 'updatedAt');
            },
            genetateToken(type) {
                if (!_.isString(type)) {
                    return undefined;
                }
                try {
                    let stringDATA = JSON.stringify({
                        id: this.get('id'),
                        type
                    });
                    let enctyptedData = cryptojs.AES.encrypt(stringDATA, 'abc123!@#!').toString();
                    return jwt.sign({
                        token: enctyptedData
                    }, 'qwery09856');
                } catch (e) {
                    console.log(e);
                    return undefined;
                }
            }
        }
    });
return user;
};
