import * as fs from "fs";
import path from "path";
import Fastify, { FastifyInstance } from "fastify";
import middle from "@fastify/middie";
import { DefaultAppApplication as DemoLB4App } from "../../default-app/dist/application";

let lbApp = new DemoLB4App({});
lbApp.projectRoot = path.resolve(__dirname, "..", "..", "default-app", "dist");

async function build() {
  const fastify = Fastify({
    http2: true,
    https: {
      key: fs.readFileSync(
        path.join(__dirname, "..", "https", "localhost-privkey.pem")
      ),
      cert: fs.readFileSync(
        path.join(__dirname, "..", "https", "localhost-cert.pem")
      ),
    },
    logger: true,
  });

  await fastify.register(middle, {
    hook: "onRequest",
  });

  lbApp.boot().then(function () {
    fastify.use("/", (req, res, next) => {
      req.baseUrl = "/";
      next();
    });

    // fastify.use("/", lbApp.requestHandler);

    fastify.get("/", (request, res) => {
      res.code(200).send({ hello: "world" });
    });

    /* fastify.use("/", (request, reply) => {
        // console.log(JSON.stringify(request));
        let response = lbApp.requestHandler(request, reply);
        console.log(response);
        reply.write(JSON.stringify({ hello: "world" }));
      }); */

    // Start the server
    fastify.listen({ port: 3001 }, (err) => {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }
    });
  });
}

build();
