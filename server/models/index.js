const { Sequelize } = require('sequelize');
const { Config } = require('../../config');
const fs = require('fs');
const path = require('path');

const db = {}

const sequelize = new Sequelize(Config.MYSQL_DATABASE_NAME, Config.MYSQL_USERNAME, Config.MYSQL_PASSWORD, {
    host: Config.MYSQL_URI,
    dialect: Config.DATABSE_TYPE
});


// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

fs.readdirSync(__dirname)
    .filter(file => {
        return (file != 'index.js' && file.indexOf('.' != 0) && file !== path.basename && file.slice(-3) === '.js');
    }).forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(mn => {
    if (db[mn].associate) {
        db[mn].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize


module.exports = db