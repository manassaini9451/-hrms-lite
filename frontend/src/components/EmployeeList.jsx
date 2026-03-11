import React, { useEffect, useState } from "react";

import { getEmployees, deleteEmployee } from "../services/api";
import { toast } from "react-toastify";

import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  IconButton,
  useTheme,
  useMediaQuery
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

function EmployeeList({ refreshFlag }) {

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

    } catch {

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
      minWidth: 120
    },

    {
      field: "fullName",
      headerName: "Name",
      flex: 1,
      minWidth: 150
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      minWidth: 200
    },

    {
      field: "department",
      headerName: "Department",
      flex: 1,
      minWidth: 140
    },

    {
      field: "action",
      headerName: "Action",
      sortable: false,
      minWidth: 100,
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

    <Paper
      elevation={3}
      sx={{
        padding: { xs: 2, md: 3 },
        overflowX: "auto"
      }}
    >

      <Typography
        variant="h6"
        mb={2}
        fontWeight="bold"
      >
        Employee List
      </Typography>

      <Box
        sx={{
          height: isMobile ? 420 : 450,
          width: "100%",
          minWidth: 600
        }}
      >

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