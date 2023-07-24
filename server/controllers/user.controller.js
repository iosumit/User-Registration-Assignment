const userHandler = require('../handlers/user.handler')
const { strings } = require('../utils/strings')

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
    if (!req.body.password) {
        return res.status(502).json({ status: strings.error, message: strings.unauthorized_access })
    }
    if (!req.body.username && !req.body.email) {
        return res.status(502).json({ status: strings.error, message: strings.unauthorized_access })
    }
    const input = {
        password: req.body.password,
    }
    if (req.body.username) {
        input.username = req.body.username;
    } else {
        input.email = req.body.email;
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