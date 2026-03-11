import React, { useEffect, useState } from "react";
import { markAttendance, getEmployees } from "../services/api";
import { toast } from "react-toastify";

import {
  Paper,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  CircularProgress
} from "@mui/material";

function AttendanceForm() {

  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    employeeId: "",
    date: "",
    status: "Present"
  });

  // Load employees
  const loadEmployees = async () => {

    try {

      const res = await getEmployees();

      setEmployees(res.data);

    } catch {

      toast.error("Failed to load employees");

    }

  };

  useEffect(() => {

    loadEmployees();

  }, []);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.employeeId || !form.date) {

      toast.error("Employee and date required");

      return;

    }

    try {

      setLoading(true);

      await markAttendance(form);

      toast.success("Attendance marked successfully");

      setForm({
        employeeId: "",
        date: "",
        status: "Present"
      });

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Failed to mark attendance"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <Paper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>

      <Typography variant="h6" mb={3} fontWeight="bold">

        Mark Attendance

      </Typography>

      <form onSubmit={handleSubmit}>

        <Grid container spacing={2}>

          {/* Employee Dropdown */}

          <Grid item xs={12} md={4}>

            <TextField
              select
              label="Select "
              name="employeeId"
              value={form.employeeId}
              onChange={handleChange}
              fullWidth
              required
            >

              <MenuItem value="">
                Select Employee
              </MenuItem>

              {employees.map((emp) => (

                <MenuItem
                  key={emp._id}
                  value={emp.employeeId}
                >

                 {emp.employeeId}

                </MenuItem>

              ))}

            </TextField>

          </Grid>

          {/* Date */}

          <Grid item xs={12} md={4}>

            <TextField
              type="date"
              label="Date"
              name="date"
              InputLabelProps={{ shrink: true }}
              inputProps={{
                max: new Date().toISOString().split("T")[0]
              }}
              value={form.date}
              onChange={handleChange}
              fullWidth
              required
            />

          </Grid>

          {/* Status */}

          <Grid item xs={12} md={4}>

            <TextField
              select
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              fullWidth
            >

              <MenuItem value="Present">

                Present

              </MenuItem>

              <MenuItem value="Absent">

                Absent

              </MenuItem>

            </TextField>

          </Grid>

        </Grid>

        <Button
          variant="contained"
          sx={{ marginTop: 3 }}
          type="submit"
          disabled={loading}
        >

          {loading ? <CircularProgress size={22} /> : "Mark Attendance"}

        </Button>

      </form>

    </Paper>

  );

}

export default AttendanceForm;