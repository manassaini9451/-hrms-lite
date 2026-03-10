const Attendance = require("../models/Attendance");

exports.markAttendance = async (req, res) => {

  try {

    const { employeeId, date, status } = req.body;

    if (!employeeId || !date || !status) {

      return res.status(400).json({
        message: "All fields are required"
      });

    }

    const exist = await Attendance.findOne({
      employeeId,
      date
    });

    if (exist) {

      return res.status(409).json({
        message: "Attendance already marked for this date"
      });

    }

    const attendance = new Attendance({
      employeeId,
      date,
      status
    });

    await attendance.save();

    res.status(201).json(attendance);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};


exports.getAttendance = async (req, res) => {

  try {

    const employeeId = req.params.employeeId;

    if (!employeeId) {

      return res.status(400).json({
        message: "Employee ID required"
      });

    }

    const records = await Attendance.find({ employeeId });

    res.status(200).json(records);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};