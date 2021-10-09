import React from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AppBarNavigation from "./components/AppBarNavigation/AppBarNavigation";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import background from "./shared/background.png";

import { Grid } from "@mui/material";

function App() {
  return (
    <div
      className="MainApp"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <Router>
        <AppBarNavigation />
        <Grid direction={"row"}>
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
      </Router>
    </div>
  );
}

export default App;
