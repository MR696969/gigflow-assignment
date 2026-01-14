const express = require("express");
const Bid = require("../models/Bid");
const Gig = require("../models/Gig");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const bid = await Bid.create({ ...req.body, freelancerId: req.user.id });
  res.json(bid);
});


router.patch("/:bidId/hire", auth, async (req, res) => {
  const bid = await Bid.findById(req.params.bidId);
  const gig = await Gig.findOne({ _id: bid.gigId, status: "open" });

  if (!gig) return res.status(400).json({ message: "Already hired" });

  gig.status = "assigned";
  await gig.save();

  await Bid.updateOne({ _id: bid._id }, { status: "hired" });
  await Bid.updateMany(
    { gigId: gig._id, _id: { $ne: bid._id } },
    { status: "rejected" }
  );

  res.json({ message: "Freelancer hired" });
});

module.exports = router;
