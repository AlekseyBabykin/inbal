const { Meetings } = require("../models/models");
const ApiError = require("../error/ApiError");

class MeetingsController {
  async create(req, res, next) {
    const infoUser = req.user;
    try {
      const {
        companyBusinessId,
        details,
        date,
        location,
        business_name,
        summary,
      } = req.body;

      const meeting = await Meetings.create({
        companyBusinessId,
        details,
        date,
        location,
        business_name,
        summary,
        salesUserId: infoUser.id,
      });
      return res.json({
        message: "The meeting was saved successfully",
        meeting,
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async update(req, res, next) {
    console.log(req.body);
    try {
      const { id } = req.params;
      const { details, date, location, summary } = req.body;

      const meeting = await Meetings.findOne({ where: { id } });
      if (!meeting) {
        next(ApiError.badRequest("The meeting was not found"));
      }
      meeting.details = details;
      meeting.date = date;
      meeting.location = location;
      meeting.summary = summary;
      await meeting.save();
      return res.json({
        message: "The meeeting successfully updated",
        meeting,
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const meeting = await Meetings.findOne({ where: { id } });
      console.log(meeting);
      if (!meeting) {
        next(ApiError.badRequest("The meeting was not found"));
      }
      await meeting.destroy();
      return res.json({
        message: "The meeting was successfully deleted",
        meeting,
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async infoAllMeetings(req, res, next) {
    try {
      const infoUser = req.user;
      const meetings = await Meetings.findAll({
        where: { salesUserId: infoUser.id },
      });

      return res.json({ meetings });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async infoMeeting(req, res, next) {
    try {
      const { id } = req.params;
      const meeting = await Meetings.findOne({ where: { id } });
      if (!meeting) {
        next(ApiError.badRequest("The meeting was not found"));
      }
      return res.json({ meeting });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new MeetingsController();
