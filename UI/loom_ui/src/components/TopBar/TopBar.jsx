import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";


const TopBar = () => {
  const [logoutTimeout, setLogoutTimeout] = useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear logout timeout when user explicitly logs out
    clearTimeout(logoutTimeout);

    // Perform logout logic here
    // Redirect user to the login page after logout
    navigate("/user/login");
  };
  const resetLogoutTimeout = () => {
    // Clear existing timeout if present
    if (logoutTimeout) {
      clearTimeout(logoutTimeout);
    }
    // Set new timeout for 5 minutes
    const newLogoutTimeout = setTimeout(() => {
      handleLogout();
    }, 1 * 60 * 1000); // 5 minutes in milliseconds

    setLogoutTimeout(newLogoutTimeout);
  };
  // Reset logout timeout on user activity
  useEffect(() => {
    const handleUserActivity = () => {
      resetLogoutTimeout();
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);

    // Clear timeout and remove event listeners on component unmount
    return () => {
      clearTimeout(logoutTimeout);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
    };
  }, []);
  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: "space-between" }}>
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
          <Button onClick={handleLogout} color="inherit">
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
