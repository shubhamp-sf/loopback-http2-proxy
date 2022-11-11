import http2 from "http2";
import http from "http";
import path from "path";
import fs from "fs";

const server = http2.createSecureServer({
  key: fs.readFileSync(
    path.join(__dirname, "..", "https", "localhost-privkey.pem")
  ),
  cert: fs.readFileSync(
    path.join(__dirname, "..", "https", "localhost-cert.pem")
  ),
});
server.on("error", (err) => console.error(err));

server.on("stream", (stream, headers) => {
  // stream is a Duplex
  console.log(headers);
  stream.respond({
    "content-type": "application/json; charset=utf-8",
    ":status": 200,
  });
  stream.end(JSON.stringify(stream));
});

server.listen(8443);
