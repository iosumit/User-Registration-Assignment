const { Config } = require('../../config');
const { version } = require('../../package.json');
const { strings } = require('../utils/strings');
const express = require('express')
const router = express.Router();

router.route('/').get((req, res) => {
    res.status(200);
    res.json({
        status: strings.success,
        message: strings.server_is_working,
        stage: Config.ENVIROMENT_TYPE,
        version: `${version}`,
    });
});

module.exports = router
