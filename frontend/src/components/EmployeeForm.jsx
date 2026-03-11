import React, { useState } from "react";
import { addEmployee } from "../services/api";
import { toast } from "react-toastify";

import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  CircularProgress
} from "@mui/material";

function EmployeeForm({ refresh }) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.employeeId || !form.fullName || !form.email || !form.department) {

      toast.error("All fields are required");

      return;
    }

    try {

      setLoading(true);

      await addEmployee(form);

      toast.success("Employee added successfully");

      refresh();

      setForm({
        employeeId: "",
        fullName: "",
        email: "",
        department: ""
      });

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Failed to add employee"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <Paper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>

      <Typography variant="h5" mb={3} fontWeight="bold">

        Add New Employee

      </Typography>

      <Box component="form" onSubmit={handleSubmit}>

        <Grid container spacing={2}>

          <Grid item xs={12} md={6}>

            <TextField
              label="Employee ID"
              name="employeeId"
              fullWidth
              value={form.employeeId}
              onChange={handleChange}
            />

          </Grid>

          <Grid item xs={12} md={6}>

            <TextField
              label="Full Name"
              name="fullName"
              fullWidth
              value={form.fullName}
              onChange={handleChange}
            />

          </Grid>

          <Grid item xs={12} md={6}>

            <TextField
              label="Email Address"
              name="email"
              type="email"
              fullWidth
              value={form.email}
              onChange={handleChange}
            />

          </Grid>

          <Grid item xs={12} md={6}>

            <TextField
              label="Department"
              name="department"
              fullWidth
              value={form.department}
              onChange={handleChange}
            />

          </Grid>

        </Grid>

        <Box mt={3}>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >

            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Add Employee"
            )}

          </Button>

        </Box>

      </Box>

    </Paper>

  );
}

export default EmployeeForm;