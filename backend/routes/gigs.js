const express = require("express");
const Gig = require("../models/Gig");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const gig = await Gig.create({ ...req.body, ownerId: req.user.id });
  res.json(gig);
});

router.get("/", async (req, res) => {
  const gigs = await Gig.find({ status: "open" });
  res.json(gigs);
});

module.exports = router;