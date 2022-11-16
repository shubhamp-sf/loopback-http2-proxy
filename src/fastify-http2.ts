/**
 * http2 server having requests forwarded to lb4 app using fastify.
 */

import * as fs from "fs";
import path from "path";
import Fastify from "fastify";
import middle from "@fastify/middie";
import { DefaultAppApplication as DemoLB4App } from "../../default-app/dist/application";
import { requestAdapter } from "./utils/request-adapter";
import { responseAdapter } from "./utils/response-adapter";

let lbApp = new DemoLB4App({});
lbApp.projectRoot = path.resolve(__dirname, "..", "..", "default-app", "dist");

async function build() {
  const fastify = Fastify({
    http2: true,
    https: {
      key: fs.readFileSync(
        path.join(__dirname, "..", "keys", "localhost-privkey.pem")
      ),
      cert: fs.readFileSync(
        path.join(__dirname, "..", "keys", "localhost-cert.pem")
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

    fastify.get("*", (request, res) => {
      // console.log(request.raw.headers);
      // request.raw /** HTTP2 stream -> can't be forwarded to loopback  */

      lbApp.requestHandler(
        requestAdapter(request.raw),
        responseAdapter(res.raw)
      );

      // fastify sends http2 responses like this
      // res.code(200).send({ hello: request.raw.headers });
    });

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
