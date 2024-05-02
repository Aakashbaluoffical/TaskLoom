import React, { useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Link,
  createTheme,
  Divider,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import GoogleLogo from "../../assets/google.png";
// import Googlefull from "../../assets/social.png";
import "./styles.css";
import axios from "axios";
// import { createTheme } from "@mui/material/styles";

const Register = () => {
  const defaultTheme = createTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [pinNumber, setPinNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform registration logic here
    console.log("Submitted:", {
      email,
      password,
      reEnterPassword,
      mobileNo,
      pinNumber,
    });

    try {
      const response = await axios.post(
        "http://192.168.54.21:9000/api/v1/register",
        {
          email,
          password,
          reEnterPassword,
          mobileNo,
          pinNumber,
        }
      );

      console.log("Registration successful:", response.data);
      // Optionally, you can redirect the user to another page or show a success message
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      // Optionally, you can display an error message to the user
    }
  };

  // Function to handle registration with Google
  const handleRegisterWithGoogle = () => {
    // Make a request to the Google API using Axios
    // axios
    //   .get("https://example.com/api/google")
    //   .then((response) => {
    //     // Handle the response data here
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     // Handle errors here
    //     console.error("Error fetching data:", error);
    //   });
  };
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container className="container" component="main" maxWidth="350px">
          <CssBaseline />
          <Box
            className="box"
            onSubmit={handleSubmit}
            component="form"
            sx={{
              marginTop: 4,
              //   "& .MuiTextField-root": { m: 0, height: "40px" },
            }}
            noValidate
            autoComplete="off"
          >
            <Typography variant="h5" align="center" gutterBottom>
              Create your Loom account!
            </Typography>
            {/* <form onSubmit={handleSubmit}> */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Email"
                  type="email"
                  id="email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Password"
                  type="password"
                  id="password"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Re-enter Password"
                  type="password"
                  id="password"
                  variant="outlined"
                  fullWidth
                  value={reEnterPassword}
                  onChange={(e) => setReEnterPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  sx={{ height: "45px" }}
                  label="Mobile No"
                  type="number"
                  id="number"
                  variant="outlined"
                  fullWidth
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Pin Number"
                  type="password"
                  id="password"
                  variant="outlined"
                  fullWidth
                  value={pinNumber}
                  onChange={(e) => setPinNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Register
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                <Divider sx={{ flexGrow: 1 }} />
                <Typography variant="body2" sx={{ px: 2 }}>
                  OR
                </Typography>
                <Divider sx={{ flexGrow: 1 }} />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={handleRegisterWithGoogle} // Add onClick handler for registering with Google
                >
                  <img
                    src={GoogleLogo}
                    alt={Google}
                    style={{ marginRight: "8px", height: "24px" }}
                  />
                  Conitue with Google
                </Button>
              </Grid>
              <Grid item xs={12} align="center">
                <Link component={RouterLink} to="/user/login" variant="body2">
                  {"Already have an account? Log In"}
                </Link>
              </Grid>
            </Grid>
            {/* </form> */}
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Register;

//Googleregister api install -> npm install gapi-script react-google-login
