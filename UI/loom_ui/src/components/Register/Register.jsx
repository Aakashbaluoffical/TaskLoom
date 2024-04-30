import React, { useState } from "react";
import {
  ThemeProvider,
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { createTheme } from "@mui/material/styles";

const Register = () => {
  const defaultTheme = createTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [pinNumber, setPinNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform registration logic here
    console.log("Submitted:", {
      email,
      password,
      reEnterPassword,
      mobileNo,
      pinNumber,
    });
  };
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container maxWidth="xs">
          <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{
              marginTop: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& .MuiTextField-root": { m: 0, height: "40px" },
            }}
            // sx={{
            //   "& .MuiTextField-root": { m: 0, height: "40px" },
            // }}
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
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ marginBottom: "10px" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Re-enter Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={reEnterPassword}
                  onChange={(e) => setReEnterPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Mobile No"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Pin Number"
                  type="text"
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
              <Grid item>
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
