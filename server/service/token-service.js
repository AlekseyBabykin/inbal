const jwt = require("jsonwebtoken");
const { TokenTable } = require("../models/models");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15s",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(salesUserId, refreshToken) {
    const tokenData = await TokenTable.findOne({
      where: { salesUserId: salesUserId },
    });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await TokenTable.create({ salesUserId, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await TokenTable.findOne({ where: { refreshToken } });

    await tokenData.destroy();

    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await TokenTable.findOne({ refreshToken });
    return tokenData;
  }
}

module.exports = new TokenService();
