import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {

  return (
    <AppBar position="static">

      <Toolbar>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          HRMS Lite
        </Typography>

        <Button color="inherit" component={Link} to="/">
          Dashboard
        </Button>

        <Button color="inherit" component={Link} to="/employees">
          Employees
        </Button>

        <Button color="inherit" component={Link} to="/attendance">
          Attendance
        </Button>

      </Toolbar>

    </AppBar>
  );
}

export default Navbar;