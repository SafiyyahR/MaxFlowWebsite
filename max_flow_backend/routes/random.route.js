const express = require("express");
const router = express.Router();
var randomController = require("../controllers/random.controller");

/**
 * Route serving similar apps page.
 */

router.post("/", randomController.findMaxFlow);

module.exports = router;