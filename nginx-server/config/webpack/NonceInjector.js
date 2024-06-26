"use strict";
const HtmlWebpackPlugin = require("html-webpack-plugin");

class NonceInjector {
  constructor(NONCE_PLACEHOLDER) {
    this.NONCE_PLACEHOLDER = NONCE_PLACEHOLDER;
  }
  apply(compiler) {
    compiler.hooks.thisCompilation.tap("NonceInjector", (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tapAsync(
        "NonceInjector",
        (compilation, callback) => {
          const { headTags } = compilation;
          headTags.forEach((tag) => {
            tag.attributes.nonce = this.NONCE_PLACEHOLDER;
          });
          callback(null, compilation);
        }
      );
    });
  }
}

module.exports = NonceInjector;
