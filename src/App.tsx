import React from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AppBarNavigation from "./components/AppBarNavigation/AppBarNavigation";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Grid, Avatar, Paper } from "@mui/material";
import AirplayIcon from "@mui/icons-material/Airplay";
import { pink } from "@mui/material/colors";

function App() {
  return (
    <div className="MainApp">
      <Router>
        <AppBarNavigation />
        <Paper elevation={6}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
          >
            <Avatar sx={{ bgcolor: pink[500] }}>
              <AirplayIcon />
            </Avatar>
            <Switch>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/">
                <Login />
              </Route>
            </Switch>
          </Grid>
        </Paper>
      </Router>
    </div>
  );
}

export default App;
