# React web app with csp nonce
A basic React + webpack + nginx application with CSP `nonces` regenerated for every page request.

The nonce attribute in the script let you “whitelist” inline script and style elements, eliminating the need for the broader and less secure CSP `unsafe-inline` directive, thereby maintaining the fundamental CSP feature of prohibiting inline script and style elements in general.

Utilising the `nonce` attribute in script or style informs browsers that the inline content was deliberately included in the document by the server (nginx) rather than being injected by a potentially malicious third party.

The [Content Security Policy](https://web.dev/articles/csp) article’s [If you absolutely must use it](https://web.dev/articles/csp#if-you-absolutely-must-use-it) section has a good example of how to use the nonce attribute in the script or style:

The main crux of the nonce is that: `nonces must be regenerated for every page request and they must be unguessable.`


Idea here is that we try to build a react application using webpack, make webpack put a placeholder for nonce using [webpack csp](https://webpack.js.org/guides/csp/). Then use nginx to generate this random base64-encoded nonce and replace the placeholder put by webpack in the script and style tags on each request.
