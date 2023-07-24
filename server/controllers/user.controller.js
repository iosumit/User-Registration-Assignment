const userHandler = require('../handlers/user.handler')
const { strings } = require('../utils/strings')

const getUserInfo = (req, res, next) => {
    return res.status(200).json({ status: "Success", message: "User fetched" })
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

module.exports = { getUserInfo, userSignup }