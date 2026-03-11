import React, { useState } from "react";

import { getAttendance } from "../services/api";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import { toast } from "react-toastify";

function AttendanceList() {

  const [employeeId, setEmployeeId] = useState("");

  const [records, setRecords] = useState([]);

  const [loading, setLoading] = useState(false);

  const load = async () => {

    if (!employeeId) {

      toast.error("Enter Employee ID");

      return;

    }

    try {

      setLoading(true);

      const res = await getAttendance(employeeId);

      const rows = res.data.map((rec) => ({
        id: rec._id,
        date: rec.date,
        status: rec.status
      }));

      setRecords(rows);

    } catch {

      toast.error("Attendance not found");

    } finally {

      setLoading(false);

    }

  };

  const columns = [

    {
      field: "date",
      headerName: "Date",
      flex: 1,
      sortable: true
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      sortable: true
    }

  ];

  return (

    <Paper elevation={3} sx={{ padding: 4 }}>

      <Typography variant="h6" mb={3} fontWeight="bold">

        Attendance Records

      </Typography>

      <Box display="flex" gap={2} mb={3}>

        <TextField
          label="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={load}
        >
          Load
        </Button>

      </Box>

      {loading ? (

        <CircularProgress />

      ) : (

        <div style={{ height: 400 }}>

          <DataGrid
            rows={records}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
          />

        </div>

      )}

    </Paper>

  );

}

export default AttendanceList;