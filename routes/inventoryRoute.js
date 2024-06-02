// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/baseController")
// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildHome);

module.exports = router;
