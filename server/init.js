const { Sequelize } = require('sequelize');
const { Config } = require('../config');

const sequelize = new Sequelize(Config.MYSQL_DATABASE_NAME, Config.MYSQL_USERNAME, Config.MYSQL_PASSWORD, {
    host: Config.MYSQL_URI,
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

async function run() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { run }