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
  '/badRequest?valid=true': jsonHandler.getValidRequest,
  '/unauthorized': jsonHandler.getUnauthorized,
  '/unauthorized?loggedIn=true': jsonHandler.getAuthorized,
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
  '/badRequest?valid=true': xmlHandler.getValidRequest,
  '/unauthorized': xmlHandler.getUnauthorized,
  '/unauthorized?loggedIn=true': xmlHandler.getAuthorized,
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
  console.log(parsedUrl);
  console.log(parsedUrl.searchParams.toString());
  if (request.headers.accept === 'text/xml') {
    if (parsedUrl.search !== '') {
      if (parsedUrl.search === '?valid=true' && (parsedUrl.pathname === '/badRequest')) {
        return urlStructXML[parsedUrl.pathname + parsedUrl.search](request, response);
      }
      if (parsedUrl.search === '?loggedIn=true' && (parsedUrl.pathname === '/unauthorized')) {
        return urlStructXML[parsedUrl.pathname + parsedUrl.search](request, response);
      }
    }
    return urlStructXML[parsedUrl.pathname](request, response);
  }
  //   console.log(request);
  //   console.log(request.headers);
  //   console.log(request.headers.accept);
  if (parsedUrl.search === '?valid=true' && (parsedUrl.pathname === '/badRequest')) {
    return urlStructJSON[parsedUrl.pathname + parsedUrl.search](request, response);
  }
  if (parsedUrl.search === '?loggedIn=true' && (parsedUrl.pathname === '/unauthorized')) {
    return urlStructJSON[parsedUrl.pathname + parsedUrl.search](request, response);
  }
  return urlStructJSON[parsedUrl.pathname](request, response);

  // Then we route based on the path that the user went to

  // return urlStructJSON.notFound(request, response);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`listening on 127.0.0.1:${port}`);
});
