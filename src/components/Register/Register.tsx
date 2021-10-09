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
import { AccountCircle, Lock } from "@mui/icons-material";
import { useMutation } from "@apollo/client";

import { IRegisterResponse } from "../../interfaces";

import { REGISTER_MUTATION } from "../../graphql/mutations";

import Toast, { showToastSuccess, showToastError } from "../Toast/Toast";
import {
  isValidPassword,
  isValidUsername,
  verifyForm,
} from "../../validation/validation";

const Register = () => {
  const [values, setValues] = React.useState({
    username: "",
    password: "",
    confPassword: "",
  });
  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [registerUser] = useMutation(REGISTER_MUTATION, {
    onCompleted: (data: IRegisterResponse) => {
      if (data && data.register)
        showToastSuccess("🦄 Registered in succesfully!");
    },
    onError: (error) => showToastError(error.message),
  });
  const handleResponse = () => {
    registerUser({
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
          Sign up
        </Typography>
        <Stack m={2} pb={2} spacing={2} direction="column">
          <TextField
            id="input-username"
            error={values.username ? !isValidUsername(values.username) : false}
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
            id="input-password"
            error={values.password ? !isValidPassword(values.password) : false}
            label="password"
            type="password"
            onChange={handleChange("password")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
            variant="filled"
          />
          <TextField
            id="input-confPassword"
            error={
              values.confPassword === ""
                ? false
                : values.confPassword !== values.password
            }
            label="confirm password"
            type="password"
            onChange={handleChange("confPassword")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
            variant="filled"
          />
          <Button
            variant="contained"
            onClick={() => {
              const { password, confPassword } = values;
              if (password !== confPassword) {
                showToastError("Passwords are not the same");
                return;
              }
              const { check, err } = verifyForm(values);
              if (!check) {
                showToastError(err);
                return;
              }
              handleResponse();
            }}
          >
            Register
          </Button>
        </Stack>

        <Toast />
      </Paper>
    </Box>
  );
};

export default Register;
