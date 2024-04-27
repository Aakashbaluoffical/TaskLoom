import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const TopBar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6">TaskLoom</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
