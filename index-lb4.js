const fs = require("fs");
const path = require("path");
const fastify = require("fastify")({
  http2: true,
  https: {
    key: fs.readFileSync(
      path.join(__dirname, "https", "localhost-privkey.pem")
    ),
    cert: fs.readFileSync(path.join(__dirname, "https", "localhost-cert.pem")),
  },
  logger: true,
});

const DemoLB4App =
  require("../default-app/dist/application").DefaultAppApplication;
let lbApp = new DemoLB4App({});
lbApp.projectRoot = path.resolve(__dirname, "..", "default-app", "dist");

async function build() {
  await fastify.register(require("@fastify/middie"), {
    hook: "onRequest",
  });

  lbApp.boot().then(function () {
    // Fix explorer openapi.json resolution
    // For more details see: https://github.com/strongloop/loopback-next/pull/3133, https://github.com/strongloop/loopback-next/issues/2329, https://github.com/strongloop/loopback-next/issues/2285
    fastify.use("/", function (req, res, next) {
      req.baseUrl = "/";
      next();
    });

    // fastify.use("/", lbApp.requestHandler);

    fastify.use("/", (request, reply) => {
      // console.log(JSON.stringify(request));
      let response = lbApp.requestHandler(request, reply);
      console.log(response);
      reply.write(JSON.stringify({ hello: "world" }));
    });
  });

  return fastify;
}

build()
  .then((fastify) => {
    fastify.listen({ port: 3001 }, (err) => {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }
    });
  })
  .catch(console.log);
