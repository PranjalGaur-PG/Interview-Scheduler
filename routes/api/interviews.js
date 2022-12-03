const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Interview = require("../../models/Interview");
const check = require("../../middlewares/Check");

// @route GET api/interviews
// @description View all interviews
// @access PUBLIC
router.get("/", async (req, res) => {
  try {
    const interviews = await Interview.find();

    res.json(interviews);
  } catch (error) {
    return res.status(500).send({ error: "Server error !" });
  }
});

// @route POST api/interviews
// @description Add an interview
// @access PUBLIC
router.post("/", check, async (req, res) => {
  const { topic, sDate, eDate, participants } = req.body;

  if (sDate > eDate)
    return res.json({ msg: "End time should be less than Start time" });

  try {
    participants.forEach(async (element) => {
      const user = await User.findById(element);
      if (!user) return res.json({ msg: "User not found !" });

      user.interviewList.forEach(async (id) => {
        const interview = await Interview.findById(id);

        if (!(interview.sDate > eDate || sDate > interview.eDate))
          return res.status(402).json({ msg: "Interview dates overlap" });
      });
    });

    const newInterview = new Interview({
      topic,
      sDate,
      eDate,
      participants,
    });

    await newInterview.save();

    participants.forEach(async (element) => {
      const user = await User.findById(element);

      user.interviewList = [...user.interviewList, newInterview.id];
      await user.save();
    });

    return res.json({ msg: "Interview added successfully :)" });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
