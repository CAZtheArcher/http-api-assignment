const http = require('http');
// const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
// const textHandler = require('./textResponses.js');
const jsonHandler = require('./jsonResponses.js');
const xmlHandler = require('./xmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStructJSON = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': jsonHandler.getSuccess,
  '/badRequest': jsonHandler.getBadRequest,
  '/unauthorized': jsonHandler.getUnauthorized,
  '/forbidden': jsonHandler.getForbidden,
  '/internal': jsonHandler.getInternal,
  '/notImplemented': jsonHandler.getNotImplemented,
  notFound: jsonHandler.notFound,
};
const urlStructXML = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': xmlHandler.getSuccess,
  '/badRequest': xmlHandler.getBadRequest,
  '/unauthorized': xmlHandler.getUnauthorized,
  '/forbidden': xmlHandler.getForbidden,
  '/internal': xmlHandler.getInternal,
  '/notImplemented': xmlHandler.getNotImplemented,
  notFound: xmlHandler.notFound,
};

// function to handle requests
const onRequest = (request, response) => {
  // first we have to parse information from the url
  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);

  //   if (request.headers.get('Accept') === 'text/xml') {
  //     return urlStructXML[parsedUrl.pathname](request, response);
  //   }

  return urlStructJSON[parsedUrl.pathname](request, response);

  // Then we route based on the path that the user went to

  // return urlStructJSON.notFound(request, response);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`listening on 127.0.0.1:${port}`);
});
