const ApiError = require("../error/ApiError");
const { SalesUsers, OTPs } = require("../models/models");
const { generateOtpPassword } = require("../otpPassword/otpPassword");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const bcrypt = require("bcrypt");

class UserService {
  async signup(email, password) {
    const condidate = await SalesUsers.findOne({ where: { email: email } });
    if (condidate) {
      throw ApiError.badRequest(
        "You already have such a username , come up with a new one"
      );
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    const otpPassword = await generateOtpPassword();

    const user = await SalesUsers.create({
      email: email,
      password: hashedPassword,
    });
    console.log("user.isActivate=>>>", user);
    const createOTP = await OTPs.create({
      otp: otpPassword,
      salesUserId: user.dataValues.id,
    });

    await mailService.sendActivationPasswordMail(email, otpPassword);

    return { isActivate: user.dataValues.isActivate };
  }

  async signin(email, password) {
    const user = await SalesUsers.findOne({ where: { email: email } });
    if (!user) {
      throw ApiError.internal("The user was not found");
    }

    let comparePassword = bcrypt.compareSync(
      password,
      user.dataValues.password
    );
    if (!comparePassword) {
      throw ApiError.internal("Invalid password");
    }
    console.log("!user.dataValues.isActivate", !user.dataValues.isActivate);
    if (!user.dataValues.isActivate) {
      const otpPassword = await generateOtpPassword();
      const updateOTP = await OTPs.findOne({
        where: { salesUserId: user.dataValues.id },
      });
      updateOTP.dataValues.otp = otpPassword;
      await updateOTP.save();
      await mailService.sendActivationPasswordMail(email, otpPassword);

      throw ApiError.badRequest("The account is not activated");
    }
    const payload = { id: user.id, email: email };
    const tokens = tokenService.generateTokens(payload);
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, isActivate: user.isActivate };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);

    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await SalesUsers.findOne({ where: { id: userData.id } });
    const payload = { id: user.dataValues.id, email: user.dataValues.email };
    const tokens = tokenService.generateTokens(payload);
    await tokenService.saveToken(user.dataValues.id, tokens.refreshToken);

    return { ...tokens, iserId: user.dataValues.id };
  }
}

module.exports = new UserService();
