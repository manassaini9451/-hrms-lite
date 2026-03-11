import React, { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import { Link } from "react-router-dom";

function Navbar() {

  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: "Dashboard", path: "/" },
    { text: "Employees", path: "/employees" },
    { text: "Attendance", path: "/attendance" }
  ];

  return (

    <>
      <AppBar position="static">

        <Toolbar>

          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            HRMS Lite
          </Typography>

          {/* Desktop Menu */}

          <Box sx={{ display: { xs: "none", md: "block" } }}>

            {menuItems.map((item) => (

              <Button
                key={item.text}
                color="inherit"
                component={Link}
                to={item.path}
              >
                {item.text}
              </Button>

            ))}

          </Box>

          {/* Mobile Menu Button */}

          <IconButton
            color="inherit"
            edge="end"
            onClick={toggleDrawer}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

        </Toolbar>

      </AppBar>

      {/* Mobile Drawer */}

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
      >

        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer}
        >

          <List>

            {menuItems.map((item) => (

              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.path}
              >

                <ListItemText primary={item.text} />

              </ListItem>

            ))}

          </List>

        </Box>

      </Drawer>

    </>
  );

}

export default Navbar;