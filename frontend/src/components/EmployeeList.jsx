import React, { useEffect, useState } from "react";

import { getEmployees, deleteEmployee } from "../services/api";
import { toast } from "react-toastify";

import { Box, Paper, Typography, CircularProgress, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import DeleteIcon from "@mui/icons-material/Delete";

function EmployeeList({ refreshFlag }) {

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadEmployees = async () => {

    try {

      setLoading(true);

      const res = await getEmployees();

      const rows = res.data.map((emp) => ({
        id: emp._id,
        employeeId: emp.employeeId,
        fullName: emp.fullName,
        email: emp.email,
        department: emp.department
      }));

      setEmployees(rows);

    } catch (error) {

      toast.error("Failed to load employees");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadEmployees();

  }, [refreshFlag]);

  const remove = async (id) => {

    if (!window.confirm("Delete this employee?")) return;

    try {

      await deleteEmployee(id);

      toast.success("Employee deleted");

      loadEmployees();

    } catch {

      toast.error("Delete failed");

    }

  };

  const columns = [

    {
      field: "employeeId",
      headerName: "Employee ID",
      flex: 1,
      sortable: true
    },

    {
      field: "fullName",
      headerName: "Name",
      flex: 1,
      sortable: true
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      sortable: true
    },

    {
      field: "department",
      headerName: "Department",
      flex: 1,
      sortable: true
    },

    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => (

        <IconButton
          color="error"
          onClick={() => remove(params.row.id)}
        >
          <DeleteIcon />
        </IconButton>

      )
    }

  ];

  if (loading)

    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  return (

    <Paper elevation={3} sx={{ padding: 3 }}>

      <Typography variant="h6" mb={2} fontWeight="bold">

        Employee List

      </Typography>

      <Box style={{ height: 450, width: "100%" }}>

        <DataGrid
          rows={employees}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          disableSelectionOnClick
        />

      </Box>

    </Paper>

  );

}

export default EmployeeList;