const config = require('./utils/config')
const http = require('http')
const logger = require('./utils/logger')
const app = require('./app')

const PORT = config.PORT
const server = http.createServer(app)

server.listen(PORT, () => {
  logger.info(`server running on port ${PORT}`)
})
