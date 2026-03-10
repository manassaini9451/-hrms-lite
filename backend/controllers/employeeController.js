const Employee = require("../models/Employee");

exports.addEmployee = async (req, res) => {

  try {

    const { employeeId, fullName, email, department } = req.body;

    if (!employeeId || !fullName || !email || !department) {

      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {

      return res.status(400).json({
        message: "Invalid email format"
      });
    }

    const exist = await Employee.findOne({
      $or: [{ employeeId }, { email }]
    });

    if (exist) {

      return res.status(409).json({
        message: "Employee already exists"
      });
    }

    const employee = new Employee({
      employeeId,
      fullName,
      email,
      department
    });

    await employee.save();

    res.status(201).json(employee);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });
  }
};

exports.getEmployees = async (req, res) => {

  try {

    const employees = await Employee.find();

    res.status(200).json(employees);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });
  }
};

exports.deleteEmployee = async (req, res) => {

  try {

    const employee = await Employee.findById(req.params.id);

    if (!employee) {

      return res.status(404).json({
        message: "Employee not found"
      });
    }

    await Employee.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Employee deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });
  }
};