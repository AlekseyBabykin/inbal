const Router = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const companyController = require("../controllers/companyController");
const router = new Router();

router.get("/info", authMiddleware, companyController.infoAllCompanys);
router.get("/info/:id", authMiddleware, companyController.infoCompany);
router.post("/create", authMiddleware, companyController.create);
router.put("/update/:id", authMiddleware, companyController.update);
router.delete("/delete/:id", authMiddleware, companyController.delete);

module.exports = router;
