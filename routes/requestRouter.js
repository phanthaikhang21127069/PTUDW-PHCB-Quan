const express = require("express");
const router = express.Router();
const controller = require("../controllers/requestController");
const upload = require("../middlewares/multer");


router.get("/", controller.show);
router.post("/addrequest",upload.single('ImageUrl'), controller.addRequest);
router.put("/editrequest", controller.editRequest);
router.delete("/deleterequest/:id", controller.deleteRequest);

// router.put("/request",controller.editRequest);
// router.delete("/request/:id", controller.deleteRequest);

module.exports = router;
