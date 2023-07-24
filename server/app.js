const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const { strings } = require('./utils/strings');

require('./init').run();

const app = express()

const userRoutes = require('./routes/user.route');
const mainRoutes = require('./routes/main.route')


app.use(cors('*'))
app.use(morgan('dev'))

app.use('/', mainRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    return res.status(404).json({ status: strings.error, message: strings.route_not_found })
})

module.exports = app