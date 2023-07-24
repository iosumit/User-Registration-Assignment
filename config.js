const Config = {
    ENVIROMENT_TYPE: process.env.ENVIROMENT_TYPE || 'dev',
    PORT: process.env.PORT || 8300,

    DATABSE_TYPE: process.env.DATABSE_TYPE || '',
    MYSQL_URI: process.env.MYSQL_URI || '',
    MYSQL_DATABASE_NAME: process.env.MYSQL_DATABASE_NAME || '',
    MYSQL_USERNAME: process.env.MYSQL_USERNAME || '',
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || '',
    MYSQL_PORT: process.env.MYSQL_PORT || 3306,

    JWT_AUTH_TOKEN_SECRET: process.env.JWT_AUTH_TOKEN_SECRET || 'jwt',
}

module.exports = { Config }