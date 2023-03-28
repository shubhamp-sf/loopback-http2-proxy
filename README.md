> Checkout this blog for http2 support in lb4 app: https://blog.shubhamp.dev/how-to-use-http2-in-loopback-4-applications
> Related Thread: https://github.com/loopbackio/loopback-next/discussions/9067

# http/2 proxy for loopback

Proxy code for forwarding HTTP2 requests to loopback, in two ways:

1. Internal [node:http2](https://nodejs.org/api/http2.html)
2. Fastify's [http2 server](https://www.fastify.io/docs/latest/Reference/HTTP2/)

<details>
  <summary>Check Out the Request Flow</summary>

### Request Flow

![image](https://user-images.githubusercontent.com/110156023/202389473-464f9600-f5ad-4e5a-a402-df9ea9aa4359.png)

</details>

### Directory Structure

```
.
├── loopback-http2-proxy/ (• this repository)
│   └── src
│       ├── native-http2.ts
|           └── H2 Server having requests forwarded to lb4 app using node's internal http2.
│       └── fastify-http2.ts
|           └── H2 Server having requests forwarded to lb4 app using fastify.
└── default-app/ (loopback app to forward requests to)
    └── (...normal loopback app)
```

### Changes required in Loopback App

**_TODO_**

### Current Supoprt

- [x] GET routes with **_returned_** responses
- [x] GET routes with responses **_send()_** directly to http by loopback.
- [ ] Translated http/1 Headers
- [ ] Cookies
- [ ] Status Codes
- [ ] Static Responses (to support `this.static('/', "index.html")`)
- [ ] Streamed Responses (`Readable` streams)
- [ ] ...(more to come)

### What has been tested?

An lb4 app [sourced here](https://github.com/shubhamp-sf/loopback-http2-sandbox) is being used to test different routes and responses.

- [ ] REST Controller with CRUD functions (Datasource: Postgres) [source](https://github.com/shubhamp-sf/loopback-http2-sandbox/blob/main/src/controllers/user.controller.ts)

  - [ ] `@post('/users')`
  - [x] `@get('/users')`
  - [x] `@get('/users/count')`
  - [ ] `@patch('/users')`
  - [x] `@get('/users/{id}')`
  - [ ] `@patch('/users/{id}')`
  - [ ] `@put('/users/{id}')`
  - [ ] `@del('/users/{id}')`

- [x] Default Ping Controller
