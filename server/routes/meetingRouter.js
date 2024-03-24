const Router = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const meetingController = require("../controllers/meetingController");

const router = new Router();

router.get("/info", authMiddleware, meetingController.infoAllMeetings);
router.get("/info/:id", authMiddleware, meetingController.infoMeeting);
router.post("/create", authMiddleware, meetingController.create);
router.put("/update/:id", authMiddleware, meetingController.update);
router.delete("/delete/:id", authMiddleware, meetingController.delete);

module.exports = router;
