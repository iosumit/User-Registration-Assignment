const express = require('express')
const router = express.Router();

const userController = require('../controllers/user.controller')

router.route('/').get(userController.getUserInfo)

module.exports = router