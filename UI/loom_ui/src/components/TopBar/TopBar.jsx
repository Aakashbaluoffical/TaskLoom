import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const TopBar = () => {
  const [logoutTimeout, setLogoutTimeout] = useState(null);
  const [logoutConfirmationOpen, setLogoutConfirmationOpen] = useState(false);
  const [autoLogout, setAutoLogout] = useState(false); // Flag to indicate automatic logout
  const [countdown, setCountdown] = useState(20); // Initial countdown value
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear logout timeout when user explicitly logs out
    clearTimeout(logoutTimeout);

    // Redirect user to the login page after logout
    navigate("/user/login");
  };

  const startCountdown = () => {
    setCountdown(20); // Reset countdown to 10 seconds
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(interval);
          handleLogout(); // Logout automatically
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000); // Update countdown every second
    setLogoutTimeout(interval);
  };

  const resetLogoutTimeout = () => {
    // Clear existing timeout if present
    if (logoutTimeout) {
      clearTimeout(logoutTimeout);
    }
    // Set new timeout for 10 minutes
    const newLogoutTimeout = setTimeout(() => {
      setLogoutConfirmationOpen(true);
      startCountdown(); // Start countdown when showing the dialog
    }, 60 * 60 * 1000); // 60 minutes in milliseconds

    setLogoutTimeout(newLogoutTimeout);
  };

  const handleLogoutConfirmation = (confirmed) => {
    setLogoutConfirmationOpen(false);
    if (confirmed) {
      handleLogout();
    } else {
      setAutoLogout(false); //Reset countdown
      resetLogoutTimeout(); // Restart the countdown
    }
  };

  // Reset logout timeout on user activity
  useEffect(() => {
    const handleUserActivity = () => {
      resetLogoutTimeout();
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);

    // Set initial timeout
    resetLogoutTimeout();

    // Clear timeout and remove event listeners on component unmount
    return () => {
      clearTimeout(logoutTimeout);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
    };
  }, []);

  useEffect(() => {
    // If countdown reaches 0 due to inactivity, set autoLogout flag to true
    if (countdown === 0 && !logoutConfirmationOpen) {
      setAutoLogout(true);
      setLogoutConfirmationOpen(true);
    }
  }, [countdown, logoutConfirmationOpen]);

  return (
    <AppBar position="static" style={{ backgroundColor: "#ffffff" }}>
      <Toolbar style={{ justifyContent: "space-between", color: "#000000" }}>
        <div style={{ flex: 1 }} />
        <Typography
          variant="h6"
          component={Link}
          to="/dashboard"
          color="inherit"
          underline="none"
        >
          TaskLoom
        </Typography>
        <div>
          <Button
            component={Link}
            to="/profile"
            color="inherit"
            style={{ marginRight: "10px" }}
          >
            Profile
          </Button>
          <Button
            onClick={() => setLogoutConfirmationOpen(true)}
            color="inherit"
          >
            Logout
          </Button>
        </div>
      </Toolbar>
      <Dialog
        open={logoutConfirmationOpen}
        onClose={() => handleLogoutConfirmation(false)}
      >
        <DialogTitle>Logout Confirmation</DialogTitle>
        <DialogContent>
          {" "}
          <Typography variant="body1">
            Are you sure you want to logout?
          </Typography>
          {(autoLogout || !logoutConfirmationOpen) && (
            <Typography variant="body2">
              You will be logged out in {countdown} seconds.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleLogoutConfirmation(false)}>
            Cancel
          </Button>
          <Button onClick={() => handleLogoutConfirmation(true)}>Logout</Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default TopBar;
