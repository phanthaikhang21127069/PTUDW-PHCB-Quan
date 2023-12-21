const express = require("express");
const router = express.Router();
const controller=require("../controllers/adsAddressController");

router.get("/",controller.show);
router.post("/editplace", controller.requestEditPlace);
router.put("/editplacerequest", controller.continueEditRequest);


module.exports=router;