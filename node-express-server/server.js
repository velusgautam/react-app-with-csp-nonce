const express = require("express");
const path = require("path");
const { Buffer } = require("buffer");
const crypto = require("crypto");
const fs = require("fs");
const app = express();

const nonceBuffer = Buffer.allocUnsafe(24);

app.get("/", async (req, res, next) => {
  crypto.webcrypto.getRandomValues(nonceBuffer);
  const nonce = nonceBuffer.toString("base64");
  if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
    next();
  } else {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    // Add CSP policy to the HTML request header to enfornce the nonce in the script and style tags
    res.header(
      "Content-Security-Policy",
      `object-src 'none'; base-uri 'none'; script-src 'strict-dynamic' 'nonce-${nonce}' 'unsafe-inline' 'self'; require-trusted-types-for 'script'`
    );
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    const data = fs.readFileSync(path.join(__dirname, "/build", "index.html"), {
      encoding: "utf8",
    });
    // replace all _NONCE_ placeholder with the generated nonce
    const result = data.replaceAll("_NONCE_", nonce);
    res.send(result);
  }
});

app.use(express.static(path.join(__dirname, "/build")));

// Start the server
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Web app running on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
