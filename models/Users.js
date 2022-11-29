const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  interviewList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "interview",
    },
  ],
});

module.exports = User = mongoose.model("user", userSchema);
