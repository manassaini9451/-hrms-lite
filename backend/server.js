require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const employeeRoutes = require("./routes/employeeRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/employees", employeeRoutes);

app.use("/api/attendance", attendanceRoutes);

app.get("/", (req, res) => {
  res.send("HRMS API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});