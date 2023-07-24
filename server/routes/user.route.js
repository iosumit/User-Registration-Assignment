const express = require('express')
const router = express.Router();
const authorization = require('../utils/authorization.token')
const userController = require('../controllers/user.controller')

router.route('/').get(authorization.verifyApiAuth).get(userController.getUserInfo)
router.route('/signup').post(userController.userSignup)

module.exports = router