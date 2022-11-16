import * as http from "http";
import { Http2ServerResponse } from "http2";

// TEMPORARY (will need a fully refactored object to make it work for all edge cases)
export const responseAdapter = (
  http2Response: Http2ServerResponse
): http.ServerResponse<http.IncomingMessage> => {
  return {
    // @ts-ignore
    setHeader(name, value) {
      console.log(name, value);
      console.log("sent", this.headersSent);
      http2Response.setHeader(name, value);
    },
    send(body: string) {
      console.log("Received", body);
      if (Array.isArray(body)) {
        body = JSON.stringify(body);
      }
      if (body === undefined) {
        http2Response.end();
        return;
      }
      http2Response.write(body);
      http2Response.end();
    },
  };
};

// The construction of adapter is no longer a problem.
// So far got success in requesting "GET" with controller methods that ***returns*** the response not directly write it to http.
