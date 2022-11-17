import * as http from "http";
import { Http2ServerResponse } from "http2";
import { Response } from "@loopback/rest";
import { Readable } from "stream";

// TEMPORARY (will need a fully refactored object to make it work for all edge cases)
export const responseAdapter = (
  http2Response: Http2ServerResponse
): http.ServerResponse<http.IncomingMessage> => {
  return {
    // @ts-ignore
    setHeader(name, value) {
      http2Response.setHeader(name, value);
    },
    // @ts-ignore
    end(chunk: any, encoding: BufferEncoding, cb?: () => void) {
      console.log("end called chunk:", chunk);
      http2Response.end(cb);
      return this;
    },
    // @ts-ignore
    send(body: Response | string | object) {
      console.log(`response adapter's send called.`);
      let responseInstance =
        body instanceof Response || body instanceof http.ServerResponse;
      console.log("body instanceof Response", responseInstance);

      /* console.log("typeof body", typeof body);
      console.log("Received", body); */

      if (responseInstance) {
        this.end();
        return;
      }
      if (typeof body === "object") {
        body = JSON.stringify(body);
      }
      if (body === undefined) {
        this.end();
        return;
      }
      http2Response.write(body);
      http2Response.end();
    },
  };
};
