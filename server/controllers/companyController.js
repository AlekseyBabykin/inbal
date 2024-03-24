const { CompanyBusiness } = require("../models/models");
const ApiError = require("../error/ApiError");

class CompanyController {
  async create(req, res, next) {
    try {
      const infoUser = req.user;
      const { name, info } = req.body;

      const company = await CompanyBusiness.create({
        salesUserId: infoUser.id,
        name,
        info,
      });
      return res.json({
        message: "The company was saved successfully",
        company,
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async update(req, res, next) {
    console.log("update");
    try {
      const { id } = req.params;
      const { salesUserId, name, info } = req.body;
      const company = await CompanyBusiness.findOne({ where: { id } });
      if (!company) {
        next(ApiError.badRequest("The company was not found"));
      }
      company.salesUserId = salesUserId;
      company.name = name;
      company.info = info;
      await company.save();
      return res.json({ message: "The company successfully updated", company });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const company = await CompanyBusiness.findOne({ where: { id } });
      if (!company) {
        next(ApiError.badRequest("The company was not found"));
      }
      await company.destroy();
      return res.json({
        message: "The company was successfully deleted",
        company,
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async infoAllCompanys(req, res, next) {
    try {
      const infoUser = req.user;

      const companies = await CompanyBusiness.findAll({
        where: { salesUserId: infoUser.id },
      });
      return res.json({ companies });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async infoCompany(req, res, next) {
    try {
      const { id } = req.params;
      const company = await CompanyBusiness.findOne({ where: { id } });
      if (!company) {
        next(ApiError.badRequest("The company was not found"));
      }
      return res.json({ company });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new CompanyController();
