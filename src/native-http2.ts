/**
 * http2 server having requests forwarded to lb4 app using Native http2 package.
 */

import http2 from "http2";
import path from "path";
import fs from "fs";
import { DefaultAppApplication as DemoLB4App } from "../../default-app/dist/application";
import { requestAdapter } from "./utils/request-adapter";
import { responseAdapter } from "./utils/response-adapter";

// create server
const server = http2.createSecureServer({
  key: fs.readFileSync(
    path.join(__dirname, "..", "keys", "localhost-privkey.pem")
  ),
  cert: fs.readFileSync(
    path.join(__dirname, "..", "keys", "localhost-cert.pem")
  ),
});

// setup loopback app
let lbApp = new DemoLB4App({});
lbApp.projectRoot = path.resolve(__dirname, "..", "..", "default-app", "dist");

server.on("error", (err) => console.error(err));

lbApp.boot().then(function () {
  server.on("request", (req, res) => {
    console.log("HTTP2 Requested ->", req.headers[":path"]);
    lbApp.requestHandler(requestAdapter(req), responseAdapter(res));

    /* res.write(JSON.stringify(req.headers));
    res.end(); */
  });
});

// TODO: look up for a way to get request res object from http2 stream to be forwarded to loopback
/* 
server.on("stream", (stream, headers) => {
  // stream is a Duplex
  stream.on("data", (chunk) => {
    console.log("on data chunk:", chunk);
  });
  stream.respond({
    "content-type": "application/json; charset=utf-8",
    ":status": 200,
  });
  stream.end(JSON.stringify(stream));
}); */

server.listen({ port: 8443 }, () => {
  console.log("may be started on 8443");
});
