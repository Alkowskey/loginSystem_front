import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useLazyQuery, gql } from "@apollo/client";

import { LOGIN_QUERY } from "../../graphql/queries";

import Toast, { showToastSuccess, showToastError } from "../Toast/Toast";

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
    <Box>
      <Stack spacing={2} direction="row">
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
      </Stack>
      <Button
        variant="contained"
        onClick={() => {
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
      <Toast />
    </Box>
  );
};

export default Login;
