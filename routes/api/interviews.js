const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Interview = require("../../models/Interview");

// @route GET api/interviews
// @description View all interviews
// @access PUBLIC
router.get("/", async (req, res) => {
  try {
    const interviews = await Interview.find();
    console.log(interviews);

    res.json(interviews);
  } catch (error) {
    return res.status(500).send({ error: "Server error !" });
  }
});

// @route POST api/interviews
// @description Add an interview
// @access PUBLIC
router.post("/", async (req, res) => {
  const { topic, sDate, eDate, participants } = req.body;
  console.log("Hi!");
  console.log(req.body);

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

// @route    GET interviews/read/:d
// @desc     Get specific interview using id
// @access   Public
router.get("/read/:id", async (req, res) => {
  try {
    const interviewRead = await Interview.findById(req.params.id);
    // console.log(req.params.id);

    if (!interviewRead) {
      return res.status(404).json({ msg: "Interview details not found !!!" });
    }
    res.json(interviewRead);
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ msg: "Server Error" });
  }
});

// @route    PATCH interviews/patch
// @desc     Edit an existing interview
// @access   Public
// router.patch("/update", async (req, res) => {});

module.exports = router;
