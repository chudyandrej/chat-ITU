var bcrypt = require('bcrypt');
var _ = require('underscore');

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
                    if (typeof body.email !== 'string' || typeof body.password !== 'string') {
                        return reject();
                    }
                    this.findOne({
                        where: {
                            email: body.email
                        }
                    }).then((user)=>{
                        user && bcrypt.compareSync(body.password, user.get('password_hash')) ? resolve() : reject();
                    },(e)=>{
                        return reject();
                    });

                });
            }

        },
        instanceMethods: {
            toPublicJSON() {
                var json = this.toJSON();
                return _.pick(json, 'id', 'email', 'createAt', 'updatedAt');
            }

        }

    });
    return user;
};
