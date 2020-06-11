module.exports = (req, res, next) => {
  res.header("access-control-allow-origin", "*"); // the * denotes anyone can make a request to our server
  res.header("access-control-allow-methods", "GET, POST, PUT, DELETE, OPTIONS"); // specifiy method(s) that are allowed when accessing a server
  res.header(
    "access-control-allow-headers",
    "Origin, X-Requested-Width, Content-Type, Accept, Authorization" // which headers can be used when making a request to the server
  );
  next();
};
// pre flight request - before get request is trigger, browser send PFR to server (client is trying to make request to the server, is this allowed?), the server sends back a response header that "get, put, etc" are allowed.
