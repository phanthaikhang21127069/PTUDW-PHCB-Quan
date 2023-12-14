const express = require("express");
const router = express.Router();
const controller = require("../controllers/manageListController");

router.get("/", controller.show);
// router.post("/wards", controller.addWard);
// router.put("/", controller.editWard);
// router.delete("/:id", controller.deleteWard);

router.post("/editplace", controller.requestEditPlace);


module.exports = router;
