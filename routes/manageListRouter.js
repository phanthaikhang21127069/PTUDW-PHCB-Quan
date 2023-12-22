const express = require("express");
const router = express.Router();
const controller = require("../controllers/manageListController");


router.get("/", controller.show);
// router.post("/wards", controller.addWard);
// router.put("/", controller.editWard);
// router.delete("/:id", controller.deleteWard);

router.post("/editplace", controller.requestEditPlace);
router.post("/editads", controller.requestEditAds);
router.put("/handle-report", controller.handleReport);



// router.post("/addrequest", controller.addRequest);
// router.put("/editrequest", controller.editRequest);
// router.delete("/deleterequest/:id", controller.deleteRequest);

module.exports = router;
