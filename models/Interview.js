const mongoose = require("mongoose");

var InterviewSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  sDate: {
    type: String,
    required: true,
  },
  eDate: {
    type: String,
    required: true,
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

module.exports = Interview = mongoose.model("interview", InterviewSchema);
