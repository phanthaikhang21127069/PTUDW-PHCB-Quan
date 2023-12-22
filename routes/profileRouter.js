const express = require("express");
const router = express.Router();
const controller=require("../controllers/profileController");

router.get("/",controller.show);

module.exports=router;