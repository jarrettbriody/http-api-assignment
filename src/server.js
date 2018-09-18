const http = require('http');
const url = require('url');
const query = require('querystring');
const handler = require('./handler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': handler.getIndex,
  '/style.css': handler.getCSS,
  '/success': handler.success,
  '/badRequest': handler.badRequest,
  '/unauthorized': handler.unauthorized,
  '/forbidden': handler.forbidden,
  '/internal': handler.internal,
  '/notImplemented': handler.notImplemented,
  notFound: handler.notFound,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, params);
  } else {
    urlStruct.notFound(request, response, params);
  }
};

http.createServer(onRequest).listen(port);
