const Router = require("express");
const router = new Router();
const { body } = require("express-validator");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.signup
);

router.post("/signin", userController.signin);

router.post("/logout", userController.logout);

router.get("/refresh", userController.refresh);
router.post("/activate", userController.activate);

module.exports = router;
