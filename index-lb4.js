'use strict'

const fs = require('fs')
const path = require('path')
const fastify = require('fastify')({
  http2: true,
  https: {
    key: fs.readFileSync(path.join(__dirname, 'https', 'localhost-privkey.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'https', 'localhost-cert.pem'))
  },
  logger: true,
})
const jsonData = fs.readFileSync(path.join(__dirname, 'data', 'data-big.json'), "utf8")

const DemoLB4App = require('../default-app/dist/application').DefaultAppApplication
let lbApp = new DemoLB4App({});
lbApp.projectRoot = path.resolve(__dirname,"..", "default-app", 'dist')


lbApp.boot().then(function() {
  // fix explorer openapi.json resolution
  // For more details see:
  // https://github.com/strongloop/loopback-next/pull/3133
  // https://github.com/strongloop/loopback-next/issues/2329
  // https://github.com/strongloop/loopback-next/issues/2285
  fastify.use('/', function(req, res, next) {
      req.baseUrl = '/'
      next();
  })
  // Attach the APIs and explorer
  fastify.use('/', lbApp.requestHandler)
  // Declare a route
 /*  fastify.get('/', (request, reply) => {
      reply.send({ hello: 'world' })
  }) */

  // Run the server!
  fastify.listen(3001, (err) => {
  if (err) {
      fastify.log.error(err)
      process.exit(1)
  }
  fastify.log.info(`server listening on ${fastify.server.address().port}`)
  })
})

/* fastify.get('/', function (request, reply) {
  reply.code(200).send(jsonData)
})

fastify.listen({ port: 3001 })
 */