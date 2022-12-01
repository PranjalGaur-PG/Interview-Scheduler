const mongoose = require("mongoose");
require("dotenv").config();

const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db);

    console.log("DB connected...");
  } catch (err) {
    console.error(err.message);
    console.log("1111");

    //exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
