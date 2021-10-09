import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useMutation, gql } from "@apollo/client";

import Toast, { showToastSuccess, showToastError } from "../Toast/Toast";
import { CatchingPokemon } from "@mui/icons-material";

const Register = () => {
  const [values, setValues] = React.useState({
    username: "",
    password: "",
  });
  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const [registerUser, { data, error, loading }] = useMutation(gql`
    mutation Register($username: String!, $password: String!) {
      register(user: { username: $username, password: $password })
    }
  `);
  if (error) {
    showToastError(error.message);
  }
  if (data && data.register) {
    showToastSuccess("🦄 Registered in succesfully!");
    console.log(data.register);
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
          try {
            registerUser({
              variables: {
                username: values.username,
                password: values.password,
              },
              onError(err) {
                console.log(err);
              },
            });
          } catch (err) {
            console.log(err);
          }
        }}
      >
        Register
      </Button>
      <Toast />
    </Box>
  );
};

export default Register;
