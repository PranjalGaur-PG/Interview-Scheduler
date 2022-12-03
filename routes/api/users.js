const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Interview = require("../../models/Interview");

// @route GET api/users
// @description View all users
// @access PUBLIC
router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    return res.status(500).send({ error: "Server error !" });
  }
});

// @route GET/api/users/read/:id
// @description Get a user using ID
// @access public
router.get("/read/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // console.log(user);

    res.json(user.name);
  } catch (err) {
    return res.status(500).send({ error: "Server error !" });
  }
});

// @route POST api/users
// @description Add a User
// @access PUBLIC
router.post("/", async (req, res) => {
  const { name, email } = req.body;

  try {
    let isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const user = new User({
      name,
      email,
      interviewList: [],
    });

    await user.save();

    res.json({ msg: "User account successfully :)" });
  } catch (error) {
    return res.status(500).send({ error: "Server error !" });
  }
});

module.exports = router;
