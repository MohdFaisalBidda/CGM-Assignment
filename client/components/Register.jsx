"use client";

import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";
import { setLocalStorageKeyValue } from "@/lib/localStorageService";

const defaultTheme = createTheme();

const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      token
      user {
        id
        firstName
        lastName
        email
        phoneNumber
        username
        followers
      }
    }
  }
`;

function Register() {
  const [signUp, { loading, error }] = useMutation(SIGN_UP);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    const regex = /^\d{0,10}$/; 

    if (regex.test(value)) {
      setPhoneNumber(value);
    }
  };
  const navigate = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      phoneNumber: data.get("phoneNumber"),
      username: data.get("username"),
    };
    try {
      const response = await signUp({ variables: { input: formData } });
      const responseData = response.data;
      if (responseData && responseData.signUp) {
        console.log("signed up user", responseData.signUp);
        toast.success("User Signed Up Successfully!");
        setLocalStorageKeyValue("user", JSON.stringify(responseData.signUp));
        navigate.push("/");
      } else {
        toast.error("Invalid response data");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        className="flex items-center justify-center h-screen"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  type="text"
                  pattern="^\d{10}$"
                  id="pNumber"
                  value={phoneNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  type="text"
                  id="username"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-400 h-14"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? <Loader /> : "Sign Up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href={"/Signin"}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Register;
