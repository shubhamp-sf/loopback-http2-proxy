'use strict'

const fs = require('fs')
const path = require('path')
const fastify = require('fastify')({
  http2: true,
  https: {
    key: fs.readFileSync(path.join(__dirname, 'https', 'localhost-privkey.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'https', 'localhost-cert.pem'))
  }
})
const jsonData = fs.readFileSync(path.join(__dirname, 'data', 'data-big.json'), "utf8")

fastify.get('/', function (request, reply) {
  reply.code(200).send(jsonData)
})

fastify.listen({ port: 3000 })
