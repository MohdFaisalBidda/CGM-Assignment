"use client";

import React from "react";
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
import Loader from "../components/Loader";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { setLocalStorageKeyValue } from "@/lib/localStorageService";
import Link from "next/link";

const defaultTheme = createTheme();

const SIGN_IN = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      token
      user {
        id
        firstName
        lastName
        password
        email
        phoneNumber
        username
        followers
      }
    }
  }
`;

function Login() {
  const [signIn, { loading, error }] = useMutation(SIGN_IN);
  const navigate = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    try {
      const response = await signIn({ variables: { input: formData } });
      const responseData = response.data;
      if (responseData && responseData.signIn) {
        console.log("signed in user", responseData.signIn);
        toast.success("User Signed In Successfully!");
        setLocalStorageKeyValue("user", JSON.stringify(responseData.signIn));
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
        className="flex justify-center items-center h-screen"
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-400 h-14"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? <Loader /> : "Sign Up"}
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  href={"/Signup"}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
