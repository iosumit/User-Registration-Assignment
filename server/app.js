const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const { strings } = require('./utils/strings');

const db = require('./models');

const app = express()

const userRoutes = require('./routes/user.route');
const mainRoutes = require('./routes/main.route');

db.sequelize.sync().then(res => {
    console.log('DB synced successfully!');
}).catch(err => {
    console.log('DB sync error!', err);
})

app.use(cors('*'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use('/', mainRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    return res.status(404).json({ status: strings.error, message: strings.route_not_found })
})

module.exports = app