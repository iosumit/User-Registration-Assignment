const userHandler = require('../handlers/user.handler')
const { strings } = require('../utils/strings')
const Joi = require('joi')

const getUserInfo = (req, res, next) => {
    const input = {
        username: req.user.username,
        email: req.user.email,
    }
    userHandler.userInfo(input, (err, result) => {
        if (err) {
            return res.status(502).json({ status: strings.error, message: err })
        }
        return res.status(201).json({
            status: strings.success,
            message: strings.user_fetched_successfully,
            data: result
        })
    })
}

const userLogin = (req, res, next) => {
    const schema = Joi.object({
        password: Joi.string().min(4).required(),
        email: Joi.string().email().required(),
    })

    const result = schema.validate(req.body)
    if (result.error) {
        return res.status(502).json({ status: strings.error, message: result.error.details[0].message })
    }

    const input = {
        password: req.body.password,
        email: req.body.email,
    }

    userHandler.userLogin(input, (err, result) => {
        if (err) {
            return res.status(502).json({ status: strings.error, message: err })
        }
        return res.status(201).json({
            status: strings.success,
            message: strings.user_logged_in_successfully,
            data: result
        })
    })
}

const userSignup = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        password: Joi.string().min(4).required(),
        email: Joi.string().email().required(),
        first_name: Joi.string().alphanum().min(3).required(),
        last_name: Joi.string().alphanum().min(3).required(),
    })

    const result = schema.validate(req.body)
    if (result.error) {
        return res.status(502).json({ status: strings.error, message: result.error.details[0].message })
    }

    const input = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    }

    userHandler.userSignup(input, (err, result) => {
        if (err) {
            return res.status(502).json({ status: strings.error, message: err })
        }
        return res.status(201).json({
            status: strings.success,
            message: strings.user_created_successfully,
            data: result
        })
    })
}

module.exports = { getUserInfo, userSignup, userLogin }