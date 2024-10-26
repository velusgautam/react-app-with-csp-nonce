(function () {
  const CSPTester = {
    logStyles: {
      header: "color: blue; font-weight: bold",
      pass: "color: green",
      fail: "color: red",
      info: "color: gray",
      warning: "color: orange",
    },

    testFunctions: {
      async testInlineScript() {
        try {
          const script = document.createElement("script");
          script.textContent = "window._cspTestVar = true;";
          document.body.appendChild(script);
          const result = window._cspTestVar === true;
          delete window._cspTestVar;
          script.remove();
          return result;
        } catch (e) {
          return false;
        }
      },

      async testEval() {
        try {
          return eval("true");
        } catch (e) {
          return false;
        }
      },

      async testExternalScript() {
        return new Promise((resolve) => {
          try {
            const script = document.createElement("script");
            script.src = "https://example.com/test.js";
            script.onerror = () => resolve(false);
            script.onload = () => resolve(true);
            document.body.appendChild(script);
            setTimeout(() => {
              script.remove();
              resolve(false);
            }, 2000);
          } catch (e) {
            resolve(false);
          }
        });
      },

      async testInlineStyle() {
        try {
          // Create a <style> element with inline CSS
          const style = document.createElement("style");
          style.textContent = "body { background-color: rgb(255, 0, 0); }"; // Use a distinct color for testing

          // Append the style element to the head
          document.head.appendChild(style);

          // Check if the style was applied by reading the computed background color
          const appliedBackground = getComputedStyle(
            document.body
          ).backgroundColor;

          // Clean up the style element after testing
          style.remove();

          // Check if the background color matches the inline style
          if (appliedBackground === "rgb(255, 0, 0)") {
            return true;
          } else {
            return false;
          }
        } catch (e) {
          return false;
        }
      },

      async testExternalStyle() {
        return new Promise((resolve) => {
          try {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "https://example.com/style.css";
            link.onerror = () => resolve(false);
            link.onload = () => resolve(true);
            document.head.appendChild(link);
            setTimeout(() => {
              link.remove();
              resolve(false);
            }, 2000);
          } catch (e) {
            resolve(false);
          }
        });
      },

      async testDataURIImage() {
        return new Promise((resolve) => {
          try {
            const img = new Image();
            img.src =
              "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
          } catch (e) {
            resolve(false);
          }
        });
      },

      async testExternalImage() {
        return new Promise((resolve) => {
          try {
            const img = new Image();
            img.src = "https://example.com/test.png";
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
          } catch (e) {
            resolve(false);
          }
        });
      },

      async testXHRRequest() {
        try {
          const xhr = new XMLHttpRequest();
          xhr.open("GET", "https://example.com/test", false);
          xhr.send();
          return true;
        } catch (e) {
          return false;
        }
      },

      async testFetchRequest() {
        try {
          const response = await fetch("https://example.com/test", {
            mode: "no-cors",
          });
          return true;
        } catch (e) {
          return false;
        }
      },

      async testWebSocket() {
        return new Promise((resolve) => {
          try {
            const ws = new WebSocket("wss://example.com");

            // If the WebSocket connection opens successfully
            ws.onopen = () => {
              ws.close();
              resolve(true);
            };

            // If an error occurs, likely due to CSP or network issues
            ws.onerror = () => {
              ws.close();
              resolve(false);
            };

            // Timeout to ensure resolution if WebSocket does not respond in time
            setTimeout(() => {
              ws.close();
              resolve(false);
            }, 2000);
          } catch (e) {
            resolve(false);
          }
        });
      },

      async testFrameLoading() {
        return new Promise((resolve) => {
          try {
            const frame = document.createElement("iframe");
            frame.src = "https://example.com";
            frame.style.display = "none";

            // Clean up and resolve with a result object
            const cleanup = (result) => {
              frame.remove();
              console.log(result.message);
              result.status === "Allowed" ? resolve(true) : resolve(false);
            };

            // Success handler if frame loads and content is accessible
            frame.onload = () => {
              try {
                // Attempt to access the frame's contentDocument
                const doc =
                  frame.contentDocument || frame.contentWindow.document;

                // If the document is accessible and has content, the load is successful
                if (doc && doc.body && doc.body.innerHTML) {
                  cleanup({
                    status: "Allowed",
                    message: "Frame loaded successfully.",
                  });
                } else {
                  // Content is blocked or empty due to CSP
                  cleanup({
                    status: "Blocked",
                    message: "Frame blocked by CSP.",
                  });
                }
              } catch (e) {
                // Accessing the document throws an error if blocked by CSP
                cleanup({
                  status: "Blocked",
                  message: "Frame blocked by CSP (cross-origin restriction).",
                });
              }
            };

            // Error handler if frame fails to load entirely
            frame.onerror = () =>
              cleanup({
                status: "Blocked",
                message: "Frame blocked by CSP or failed to load.",
              });

            // Append the frame to the DOM to initiate loading
            document.body.appendChild(frame);
          } catch (e) {
            resolve(false);
          }
        });
      },

      async testMediaElement() {
        try {
          return new Promise((resolve) => {
            const audio = new Audio("https://example.com/test.mp3");

            // Event listener for successful loading
            audio.addEventListener("canplaythrough", () => {
              resolve(true);
            });

            // Event listener for CSP or other loading errors
            audio.addEventListener("error", (e) => {
              resolve(false);
            });

            // Start loading the media
            audio.load();
          });
        } catch (e) {
          return false;
        }
      },

      async testObjectElement() {
        return new Promise((resolve) => {
          try {
            const obj = document.createElement("object");
            obj.data = "https://example.com/test.pdf";
            obj.type = "application/pdf"; // Specify type if known, for accurate testing
            obj.style.display = "none";

            // Clean up and resolve
            const cleanup = (result) => {
              obj.remove();
              resolve(true);
            };

            // Success handler if object loads
            obj.onload = () => cleanup(true);

            // Error handler if object fails to load
            obj.onerror = () => cleanup(false);

            // Timeout as a fallback to ensure resolution
            setTimeout(() => cleanup(false), 2000);

            // Append the object to the DOM to initiate loading
            document.body.appendChild(obj);
          } catch (e) {
            resolve(false);
          }
        });
      },
    },

    directives: {
      "default-src": [
        { name: "inline-script", test: "testInlineScript" },
        { name: "eval", test: "testEval" },
        { name: "external-script", test: "testExternalScript" },
      ],
      "script-src": [
        { name: "inline-script", test: "testInlineScript" },
        { name: "eval", test: "testEval" },
        { name: "external-script", test: "testExternalScript" },
      ],
      "style-src": [
        { name: "inline-style", test: "testInlineStyle" },
        { name: "external-style", test: "testExternalStyle" },
      ],
      "img-src": [
        { name: "external-image", test: "testExternalImage" },
        { name: "data-uri-image", test: "testDataURIImage" },
      ],
      "connect-src": [
        { name: "xhr-request", test: "testXHRRequest" },
        { name: "fetch-request", test: "testFetchRequest" },
        { name: "websocket", test: "testWebSocket" },
      ],
      "frame-src": [{ name: "frame-loading", test: "testFrameLoading" }],
      "media-src": [{ name: "media-element", test: "testMediaElement" }],
      "object-src": [{ name: "object-element", test: "testObjectElement" }],
    },

    getCSPFromMeta() {
      return (
        document.querySelector('meta[http-equiv="Content-Security-Policy"]')
          ?.content ||
        document.querySelector('meta[http-equiv="content-security-policy"]')
          ?.content
      );
    },

    async runTests() {
      console.log(
        "%c[CSP Security Test] Starting comprehensive CSP testing...",
        this.logStyles.header
      );

      // Log current CSP
      const cspContent = this.getCSPFromMeta();
      console.log(
        "%c[CSP Security Test] Content Security Policy:",
        this.logStyles.header
      );
      if (cspContent) {
        console.log(`%c${cspContent}`, this.logStyles.info);
      } else {
        console.log(
          "%cNo CSP meta tag found. Check network response headers for CSP.",
          this.logStyles.warning
        );
      }

      const results = {
        total: 0,
        passed: 0,
        failed: 0,
        details: {},
      };

      // Run tests for each directive
      for (const [directive, tests] of Object.entries(this.directives)) {
        console.log(`\n%cTesting ${directive}:`, this.logStyles.header);
        results.details[directive] = [];

        for (const test of tests) {
          results.total++;
          try {
            const startTime = performance.now();
            const allowed = await this.testFunctions[test.test]();
            const duration = (performance.now() - startTime).toFixed(2);

            if (!allowed) {
              results.passed++;
              console.log(
                `%c✓ ${test.name} (${duration}ms)`,
                this.logStyles.pass,
                "\nStatus: Blocked (Secure)"
              );
            } else {
              results.failed++;
              console.log(
                `%c✗ ${test.name} (${duration}ms)`,
                this.logStyles.fail,
                "\nStatus: Allowed (Potential Risk)"
              );
            }

            results.details[directive].push({
              name: test.name,
              allowed,
              duration,
            });
          } catch (error) {
            results.failed++;
            console.log(
              `%c✗ ${test.name}`,
              this.logStyles.fail,
              "\nStatus: Error",
              `\nDetails: ${error.message}`
            );
          }
        }
      }

      // Log summary
      console.log(
        "\n%c[CSP Security Test] Summary:",
        this.logStyles.header,
        `\nTotal Tests: ${results.total}`,
        `\nPassed (Blocked): ${results.passed}`,
        `\nFailed (Allowed): ${results.failed}`
      );

      return results;
    },
  };

  // Run the tests
  CSPTester.runTests().catch(console.error);
})();
