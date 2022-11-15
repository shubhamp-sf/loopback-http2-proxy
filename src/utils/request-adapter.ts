import { Http2ServerRequest } from "http2";
import { IncomingMessage } from "http";
import { Socket } from "net";

// TEMPORARY (will need a fully refactored object to make it work for all edge cases)
export const requestAdapter = (
  http2Request: Http2ServerRequest
): IncomingMessage => {
  const http1Req = new IncomingMessage(new Socket());
  http1Req.method = "GET";
  http1Req.url = http2Request.headers[":path"];
  return http1Req;
};
