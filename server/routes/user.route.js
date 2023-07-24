const express = require('express')
const router = express.Router();

const userController = require('../controllers/user.controller')

router.route('/').get(userController.getUserInfo)
router.route('/signup').post(userController.userSignup)

module.exports = router