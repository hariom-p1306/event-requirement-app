const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);
    const saved = await event.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/", async (req, res) => {
  res.send("Event API is working 🚀");
});

module.exports = router;