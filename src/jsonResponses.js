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
  const responseJSON = { message: 'This is a successful response.' };
  respondJSON(request, response, 200, responseJSON);
};
const getBadRequest = (request, response) => {
  const responseJSON = { message: 'Missing valid Query parameter set to true.', id: 'badRequest' };
  respondJSON(request, response, 400, responseJSON);
};
const getUnauthorized = (request, response) => {
  const responseJSON = { message: 'Missing loggedIn query parameter set to yes.', id: 'unauthorized' };
  respondJSON(request, response, 401, responseJSON);
};
const getForbidden = (request, response) => {
  const responseJSON = { message: 'You do not have access to this content', id: 'forbidden' };
  respondJSON(request, response, 403, responseJSON);
};
const getInternal = (request, response) => {
  const responseJSON = { message: 'Internal Server Error. Something went wrong.', id: 'internalServerError' };
  respondJSON(request, response, 500, responseJSON);
};
const getNotImplemented = (request, response) => {
  const responseJSON = { message: 'A get request for this page has not been implemented yet. Check again later for updated content.', id: 'notImplemented' };
  respondJSON(request, response, 501, responseJSON);
};
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  respondJSON(request, response, 404, responseJSON);
};

const getValidRequest = (request, response) => {
  const responseJSON = { message: 'This request has the required parameters.' };
  respondJSON(request, response, 200, responseJSON);
};
const getAuthorized = (request, response) => {
  const responseJSON = { message: 'You have sucessfully viewed the content.' };
  respondJSON(request, response, 200, responseJSON);
};

module.exports = {
  getSuccess,
  getBadRequest,
  getValidRequest,
  getUnauthorized,
  getAuthorized,
  getForbidden,
  getInternal,
  getNotImplemented,
  notFound,
};
