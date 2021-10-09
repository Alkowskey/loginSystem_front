import React from "react";
import {
  Stack,
  Button,
  Box,
  InputAdornment,
  TextField,
  Paper,
  Typography,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useLazyQuery } from "@apollo/client";

import { ILoginResponse } from "../../interfaces";

import { LOGIN_QUERY } from "../../graphql/queries";

import Toast, { showToastSuccess, showToastError } from "../Toast/Toast";
import { verifyForm } from "../../validation/validation";

const Login = () => {
  const [values, setValues] = React.useState({
    username: "",
    password: "",
    token: "",
  });
  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const [login] = useLazyQuery(LOGIN_QUERY, {
    onCompleted: (data: ILoginResponse) => {
      const loginResponse: ILoginResponse = data;
      if (loginResponse && loginResponse.login.token) {
        showToastSuccess("🦄 Logged in succesfully!");
        localStorage.setItem("token", loginResponse.login.token as string);
        localStorage.setItem("username", values.username as string);
      }
    },
    onError: (error) => showToastError(error.message),
  });
  const handleResponse = async () => {
    await login({
      variables: {
        username: values.username,
        password: values.password,
      },
    });
  };

  return (
    <Box m={2} pt={3}>
      <Paper elevation={6} style={{ minWidth: "50vh" }}>
        <Typography m={2} pt={2} variant="h5" color="text.primary">
          Log in
        </Typography>
        <Stack m={2} pb={2} spacing={2} direction="column">
          <TextField
            id="input-with-icon-textfield"
            label="username"
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
          <Button
            variant="contained"
            onClick={() => {
              const { check, err } = verifyForm(values);
              if (!check) {
                showToastError(err);
                return;
              }
              handleResponse();
            }}
          >
            Login
          </Button>
        </Stack>
        <Toast />
      </Paper>
    </Box>
  );
};

export default Login;
