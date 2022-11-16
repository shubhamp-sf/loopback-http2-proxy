```
.
├── fastify-http2/ (⭐ this repository)
│   └── src
│       ├── core-http2.ts (native http2 implementation)
│       ├── fastify-only.ts (normal http2 server with fastify)
│       └── lb4-proxy.ts (proxy with fastify)
└── default-app/ (lb4 app to forward requests to)
    └── (...normal loopback app)
```
