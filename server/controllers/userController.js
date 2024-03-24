const ApiError = require("../error/ApiError");
const { validationResult } = require("express-validator");
const userService = require("../service/user-service");
const { OTPs, SalesUsers } = require("../models/models");
const { Op } = require("sequelize");
const mailService = require("../service/mail-service");

class UserController {
  async signup(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.badRequest("Validation error", errors.array()));
      }
      const { email, password } = req.body;

      const userData = await userService.signup(email, password);

      // res.cookie("refreshToken", userData.refreshToken, {
      //   maxAge: 30 * 24 * 60 * 60 * 1000,
      //   httpOnly: true,
      // });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async signin(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.signin(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData.accessToken);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      const token = await userService.logout(refreshToken);

      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData.accessToken);
    } catch (e) {
      next(e);
    }
  }
  async activate(req, res, next) {
    try {
      const { email, password, otpPassword } = req.body;

      const user = await SalesUsers.findOne({ where: { email: email } });
      const tenSecondsAgo = new Date();
      tenSecondsAgo.setSeconds(tenSecondsAgo.getSeconds() - 300);
      const userInfo = await OTPs.findOne({
        where: {
          salesUserId: user.dataValues.id,
          createdAt: {
            [Op.gt]: tenSecondsAgo,
          },
        },
      });

      if (!userInfo) {
        next(ApiError.badRequest("Error Time is up"));
      }

      if (parseInt(userInfo.dataValues.otp, 10) !== parseInt(otpPassword, 10)) {
        next(ApiError.badRequest("Incorrect OTP"));
      }

      user.isActivate = true;
      await user.save();
      const userData = await userService.signin(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json({
        accessToken: userData.accessToken,
        isActivate: userData.isActivate,
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
