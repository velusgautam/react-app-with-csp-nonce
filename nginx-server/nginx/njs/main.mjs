const Buffer = Buffer.allocUnsafe(24);

export default {
  cspNonce() {
    crypto.getRandomValues(Buffer);
    return Buffer.toString("base64");
  },
};
