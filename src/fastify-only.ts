import * as fs from "fs";
import path from "path";
import Fastify from "fastify";

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
const jsonData = fs.readFileSync(
  path.join(__dirname, "..", "data", "data-big.json"),
  "utf8"
);

fastify.get("/", function (request, reply) {
  reply.code(200).send(jsonData);
});

fastify.listen({ port: 3001 });
