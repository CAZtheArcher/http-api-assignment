const respondXML = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'text/xml',
    'Content-Length': Buffer.byteLength(object, 'utf8'),
  };

  response.writeHead(status, headers);
  response.write(object);
  response.end();
};

const getSuccess = (request, response) => {
  const message = '<response><message>This is a successful response</message></response>';
  respondXML(request, response, 200, message);
};
const getBadRequest = (request, response) => {
  const message = '<response><message>Missing valid Query parameter set to true.</message><id>badRequest</id></response>';
  respondXML(request, response, 400, message);
};
const getUnauthorized = (request, response) => {
  const message = '<response><message>Missing loggedIn query parameter set to yes.</message><id>unauthorized</id></response>';
  respondXML(request, response, 401, message);
};
const getForbidden = (request, response) => {
  const message = '<response><message>You do not have access to this content</message><id>forbidden</id></response>';
  respondXML(request, response, 403, message);
};
const getInternal = (request, response) => {
  const message = '<response><message>Internal Server Error. Something went wrong.</message><id>internalServerError</id></response>';
  respondXML(request, response, 500, message);
};
const getNotImplemented = (request, response) => {
  const message = '<response><message>A get request for this page has not been implemented yet. Check again later for updated content.</message><id>notImplemented</id></response>';
  respondXML(request, response, 501, message);
};
const notFound = (request, response) => {
  const message = '<response><message>The page you are looking for was not found.</message><id>notFound</id></response>';
  respondXML(request, response, 404, message);
};

const getValidRequest = (request, response) => {
  const message = '<response><message>This request has the required parameters.</message></response>';
  respondXML(request, response, 200, message);
};
const getAuthorized = (request, response) => {
  const message = '<response><message>You have sucessfully viewed the content.</message></response>';
  respondXML(request, response, 200, message);
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
