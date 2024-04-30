import React, { useState } from "react";
import axios from "axios";
// import Login_image from '../../assets/login.jpg';
import "./Login.css";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  ThemeProvider,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import ClearIcon from "@mui/icons-material/Clear";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { createTheme } from "@mui/material/styles";
import { BASE_URL } from "../../services/constants";
import { useNavigate, Link as RouterLink } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000">
        Task Loom
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const isValidEmail = (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    // Password strength validation
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleEmailBlur = () => {
    setEmailError(!isValidEmail(email));
  };

  const handlePasswordBlur = () => {
    setPasswordError(!isValidPassword(password));
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError(!isValidEmail(email));
    setPasswordError(!isValidPassword(password));

    if (!isValidEmail(email) || !isValidPassword(password)) {
      return;
    }
    const url = `${BASE_URL}/api/v1/login`;
    const queryParams = new URLSearchParams({
      username: email,
      password: password,
    });
    // Make LOGIN API call using Axios
    axios
      .post(`${url}?${queryParams}`)
      .then((response) => {
        // Handle successful response
        // console.log("Login successful:", response.data.data);
        const responseData = response.data.data;
        const errorMessage = response.data.Error;
        // console.log("object", errorMessage);
        if (responseData.length === 0) {
          // If login data is empty, display error message and prevent login
          setLoginMessage(errorMessage);
        } else {
          // Redirect to dashboard after successful login
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        // Handle error
        // console.error("Error occurred during login:", error.message);
        setLoginMessage("Error occurred"); // Set the error message
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          {/* <div className='login_image_container'>
            <img className='login_image'  src={Login_image} alt="No_image"/>
            </div> */}
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
              Welcome!
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              {loginMessage && (
                <Card sx={{ border: "2px solid red" }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {loginMessage.includes("error") && (
                        <ErrorOutlineIcon
                          fontSize="small"
                          color="error"
                          style={{ marginRight: 4 }}
                        />
                      )}
                      <Typography
                        variant="body1"
                        color={
                          loginMessage.includes("error")
                            ? "error"
                            : "textPrimary"
                        }
                      >
                        {loginMessage}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
                error={emailError}
                helperText={
                  emailError ? "Please enter a valid email address" : ""
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handlePasswordBlur}
                error={passwordError}
                helperText={
                  passwordError
                    ? "Password must be at least 8 characters long and include uppercase, lowercase, digit, and special characters"
                    : ""
                }
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    component={RouterLink}
                    to="/user/register"
                    variant="body2"
                  >
                    {"Don't have an account? Register here"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Login;
