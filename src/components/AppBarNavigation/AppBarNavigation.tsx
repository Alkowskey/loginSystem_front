import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  ThemeProvider,
} from "@mui/material";

import { createTheme } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";

import MenuIcon from "@mui/icons-material/Menu";

import { Link } from "react-router-dom";

export default function AppBarNavigation() {
  const [username, setUsername] = React.useState(
    localStorage.getItem("username")
  );
  const theme = createTheme({
    palette: {},
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {username || "Login Page"}
            </Typography>
            <Link to="/login" color="primary">
              <Button
                style={{
                  paddingLeft: 13,
                  textDecoration: "none",
                  color: "#FFFFFF",
                }}
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button
                style={{
                  paddingLeft: 13,
                  textDecoration: "none",
                  color: "#FFFFFF",
                }}
              >
                Register
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
