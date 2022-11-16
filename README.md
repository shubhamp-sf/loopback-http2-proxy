### Directory Structure
```
.
├── loopback-http2-proxy/ (• this repository)
│   └── src
│       ├── core-http2.ts (native http2 implementation)
│       ├── fastify-only.ts (normal http2 server with fastify)
│       └── lb4-proxy.ts (proxy with fastify)
└── default-app/ (lb4 app to forward requests to)
    └── (...normal loopback app)
```

### Current Supoprt

- [x] GET routes with ***returned*** responses
- [ ] GET routes with responses ***send()*** directly to http by loopback.
- [ ] Translated http/1 Headers
- [ ] Cookies
- [ ] Status Codes
- [ ] Static Responses (to support `this.static('/', "index.html")`)
- [ ] Streamed Responses (`Readable` streams)
- [ ] ...(more to come)

### Manually Tested Endpoints

An lb4 app [sourced here](https://github.com/shubhamp-sf/lb4-sandbox-http2) is being used to test different routes and responses.

- [ ] REST Controller with CRUD functions (Datasource: Postgres) [source](https://github.com/shubhamp-sf/lb4-sandbox-http2/blob/main/src/controllers/user.controller.ts)
    - [ ] `@post('/users')`
    - [x] `@get('/users')`
    - [x] `@get('/users/count')`
    - [ ] `@patch('/users')`
    - [ ] `@get('/users/{id}')`
    - [ ] `@patch('/users/{id}')`
    - [ ] `@put('/users/{id}')`
    - [ ] `@del('/users/{id}')`

- [x] Default Ping Controller
