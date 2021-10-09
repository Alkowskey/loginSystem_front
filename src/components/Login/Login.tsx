import React from "react";
import {
  Stack,
  Grid,
  Button,
  Box,
  InputAdornment,
  TextField,
  Paper,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useLazyQuery } from "@apollo/client";

import { LOGIN_QUERY } from "../../graphql/queries";

import Toast, { showToastSuccess, showToastError } from "../Toast/Toast";
import {
  isValidPassword,
  isValidUsername,
  verifyForm,
} from "../../utils/validation";

const Login = () => {
  const [values, setValues] = React.useState({
    username: "",
    password: "",
    token: "",
  });
  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const [login, { data, error, loading }] = useLazyQuery(LOGIN_QUERY);
  if (error) {
    showToastError(error.message);
    console.log(JSON.stringify(error, null, 2));
  }
  if (data && data.login.token) {
    showToastSuccess("🦄 Logged in succesfully!");
    localStorage.setItem("token", data.login.token as string);
    console.log(data.login.token);
  }

  return (
    <Box m={2} pt={3}>
      <Grid item xs={4}>
        <Paper elevation={6}>
          <Stack m={2} pt={3} spacing={2} direction="column">
            <TextField
              id="input-with-icon-textfield"
              label="username"
              error={
                values.username ? !isValidUsername(values.username) : false
              }
              onChange={handleChange("username")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              variant="filled"
            />
            <TextField
              id="input-with-icon-password"
              label="password"
              type="password"
              error={
                values.password ? !isValidPassword(values.password) : false
              }
              onChange={handleChange("password")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              variant="filled"
            />
          </Stack>
          <Box m={2} pb={3}>
            <Button
              variant="contained"
              onClick={() => {
                const { check, err } = verifyForm(values);
                if (!check) {
                  showToastError(err);
                  return;
                }
                login({
                  variables: {
                    username: values.username,
                    password: values.password,
                  },
                });
              }}
            >
              Login
            </Button>
          </Box>
          <Toast />
        </Paper>
      </Grid>
    </Box>
  );
};

export default Login;
