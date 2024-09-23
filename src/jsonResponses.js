// const text = require('./textResponses.js');

const respondJSON = (request, response, status, object) => {
  const content = JSON.stringify(object);

  const headers = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  };

  response.writeHead(status, headers);

  if (request.method !== 'HEAD') {
    response.write(content);
  }

  response.end();
};

const getSuccess = (request, response) => {
  const responseJSON = { message: 'This is a successful JSON response' };
  respondJSON(request, response, 200, responseJSON);
};
const getBadRequest = (request, response) => {
  const responseJSON = { message: 'bad request', id: 'badRequest' };
  respondJSON(request, response, 400, responseJSON);
};
const getUnauthorized = (request, response) => {
  const responseJSON = { message: 'unauthorized', id: 'unauthorized' };
  respondJSON(request, response, 401, responseJSON);
};
const getForbidden = (request, response) => {
  const responseJSON = { message: 'cannot enter this part of the website', id: 'forbidden' };
  respondJSON(request, response, 403, responseJSON);
};
const getInternal = (request, response) => {
  const responseJSON = { message: 'internal server error', id: 'internalServerError' };
  respondJSON(request, response, 500, responseJSON);
};
const getNotImplemented = (request, response) => {
  const responseJSON = { message: 'page not implemented', id: 'notImplemented' };
  respondJSON(request, response, 501, responseJSON);
};
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  getSuccess,
  getBadRequest,
  getUnauthorized,
  getForbidden,
  getInternal,
  getNotImplemented,
  notFound,
};
