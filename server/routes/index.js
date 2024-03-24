const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const companyRouter = require("./companyRouter");
const meetingRouter = require("./meetingRouter");

router.use("/user", userRouter);
router.use("/company", companyRouter);
router.use("/meeting", meetingRouter);

module.exports = router;
