const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

const logged = function (req, res, next) {
  console.log("LOGGED");
  next();
};

module.exports = { requestTime, logged };
