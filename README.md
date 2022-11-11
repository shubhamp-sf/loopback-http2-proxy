🛑 THIS CURRENTLY WON'T WORK because the req object is of type `Http2ServerRequest` which loopback doesn't expect or support as it expects `IncomingMessage` from "http" module. 🛑

TODO: Build an adapter for the same.
