const express = require("express");
const router = express.Router();
const controller = require("../controllers/reportController");

router.get("/", controller.show);
router.put("/handle-report", controller.handleReport);

// router.post("/wards", controller.addWard);
// router.put("/", controller.editWard);
// router.delete("/:id", controller.deleteWard);

module.exports = router;
