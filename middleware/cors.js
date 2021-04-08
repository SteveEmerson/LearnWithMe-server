const CorsMiddleware = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header()
  res.header("Access-Control-Allow-Headers", "POST, PUT, GET, DELETE, OPTIONS, Content-Type");
  return next();
};

module.exports = CorsMiddleware;