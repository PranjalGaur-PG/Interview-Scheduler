const mongoose = reuire("mongoose");

var InterviewSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  sDate: {
    type: Date,
    required: true,
  },
  eDate: {
    type: Date,
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
