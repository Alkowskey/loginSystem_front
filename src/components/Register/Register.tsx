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
import { useMutation } from "@apollo/client";

import { IRegisterResponse } from "../../interfaces";

import { REGISTER_MUTATION } from "../../graphql/mutations";

import Toast, { showToastSuccess, showToastError } from "../Toast/Toast";
import {
  isValidPassword,
  isValidUsername,
  verifyForm,
} from "../../utils/validation";

const Register = () => {
  const [values, setValues] = React.useState({
    username: "",
    password: "",
    confPassword: "",
  });
  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [registerUser, { data, error }] = useMutation(REGISTER_MUTATION);
  const registerResponse: IRegisterResponse = data;
  if (error) showToastError(error.message);

  if (registerResponse && registerResponse.register)
    showToastSuccess("🦄 Registered in succesfully!");

  return (
    <Box m={2} pt={3}>
      <Grid item xs={4}>
        <Paper elevation={6}>
          <Stack m={2} pt={3} spacing={2} direction="column">
            <TextField
              id="input-with-icon-textfield"
              error={
                values.username ? !isValidUsername(values.username) : false
              }
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
              error={
                values.password ? !isValidPassword(values.password) : false
              }
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
            <TextField
              id="input-with-icon-password"
              error={
                values.password ? !isValidPassword(values.password) : false
              }
              label="password"
              type="password"
              onChange={handleChange("confPassword")}
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
                registerUser({
                  variables: {
                    username: values.username,
                    password: values.password,
                  },
                });
              }}
            >
              Register
            </Button>
          </Box>
          <Toast />
        </Paper>
      </Grid>
    </Box>
  );
};

export default Register;
