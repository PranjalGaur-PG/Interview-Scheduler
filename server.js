const express = require("express");
const connectDB = require("./connectDB.js");
const path = require("path");
const cors = require("cors");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8000;

//connect database
connectDB();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/interviews", require("./routes/api/interviews"));
app.use("/api/users", require("./routes/api/users"));

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
