const express = require("express");

const router = express.Router();

const {
  getQueue,
  updateQueue
} = require("../controllers/queueController");

router.get("/", getQueue);

router.put("/:room", updateQueue);

module.exports = router;