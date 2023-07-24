const http = require('http')
const app = require('./server/app')
const { Config } = require('./config')

const server = http.createServer(app)

server.listen(Config.PORT, () => console.log('Server running on port:', Config.PORT))