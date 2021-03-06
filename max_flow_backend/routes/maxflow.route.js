const express = require("express");
const router = express.Router();
var maxFlowController = require("../controllers/maxflow.controller");

/**
 * Route serving similar apps page.
 */

router.post("/", maxFlowController.findMaxFlow);

module.exports = router;