const express = require("express");
const router = express.Router();
const controller = require("../controllers/adsManageController");

router.get("/", controller.show);
router.post("/editads", controller.requestEditAds);
router.put("/editadsrequest", controller.continueRequestEditAds);

module.exports = router;
