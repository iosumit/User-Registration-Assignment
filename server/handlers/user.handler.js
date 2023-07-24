const async = require('async')
const { User } = require('../models')
const authorization = require('../utils/authorization.token')
const { Op } = require("sequelize");
const { strings } = require('../utils/strings');

const userSignup = (input, next) => {
    const modelName = {};
    async.series([
        cb => {
            User.findAll({
                attributes: ['username', 'email'],
                where: {
                    [Op.or]: {
                        username: input.username,
                        email: input.email
                    }
                }
            }).then(res => {
                if (res.length > 0)
                    return cb(strings.user_exits_already)
                return cb();
            }).catch(err => {
                cb(err)
            });
        },
        cb => {
            User.create(input)
                .then(res => {
                    if (!res)
                        return cb(strings.unable_to_created_user)
                    modelName.user = {
                        id: res.id,
                        first_name: res.first_name,
                        last_name: res.last_name,
                        username: res.username,
                        email: res.email,
                        createdAt: res.createdAt,
                    };
                    modelName.token = authorization.createToken(modelName.user)
                    return cb()
                })
                .catch(
                    err =>
                        cb(err))

        },

    ], err => {
        if (err) {
            next(err)
        } else {
            next(null, modelName)
        }
    })
}

const userInfo = (input, next) => {
    const modelName = {};
    async.series([
        cb => {
            User.findAll({
                attributes: ['username', 'email', 'createdAt', 'id', 'last_name', 'first_name'],
                where: {
                    [Op.and]: {
                        username: input.username,
                        email: input.email
                    }
                }
            }).then(res => {
                if (res.length == 0)
                    return cb(strings.user_not_found)
                modelName.user = {
                    id: res[0].id,
                    first_name: res[0].first_name,
                    last_name: res[0].last_name,
                    username: res[0].username,
                    email: res[0].email,
                    createdAt: res[0].createdAt,
                };
                return cb();
            }).catch(err => {
                cb(err)
            });
        },
    ], err => {
        if (err) {
            next(err)
        } else {
            next(null, modelName)
        }
    })
}

module.exports = {
    userSignup,
    userInfo
}