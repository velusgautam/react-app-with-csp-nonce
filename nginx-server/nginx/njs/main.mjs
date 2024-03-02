const bufferValue = Buffer.allocUnsafe(24);

export default {
  getNonce() {
    crypto.getRandomValues(bufferValue);
    return bufferValue.toString("base64");
  },
};
