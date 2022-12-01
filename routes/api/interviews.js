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

    res.json(interviews);
  } catch (error) {
    return res.status(500).send({ error: "Server error !" });
  }
});

// @route POST api/interviews
// @description Add an interview
// @access PUBLIC
router.post("/", async (req, res) => {
  const { topic, sDate, eDate, userList } = req.body;

  if (sDate > eDate)
    return res.json({ msg: "End time should be less than Start time" });

  try {
    userList.forEach(async (element) => {
      const user = await User.findById(element);
      if (!user) return res.json({ msg: "User not found !" });

      user.interviewList.forEach(async (id) => {
        const interview = await Interview.findById(id);

        if (!(interview.sDate > eDate || sDate > interview.eDate))
          return res.json({ msg: "Interview dates overlap" });
      });
    });

    const newInterview = new Interview({
      topic,
      sDate: sDate.toLocal,
      eDate,
      participants: userList.map((user) => user.id),
    });

    await newInterview.save();

    userList.forEach(async (element) => {
      const user = await User.findById(element);

      user.interviewList.append(newInterview.id);
      await user.save();
    });

    return res.json({ msg: "Interview added successfully :)" });
  } catch (error) {
    return res.status(500).send({ error: "Server error !" });
  }
});

module.exports = router;
