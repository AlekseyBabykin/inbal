const ApiError = require("../error/ApiError");
const tokenService = require("../service/token-service");
require("dotenv").config();

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.unauthorized());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.unauthorized());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.unauthorized());
    }

    req.user = userData;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Not authorized" });
  }
};
