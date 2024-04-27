import React from "react";
import { Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = () => {
  return (
    <Drawer variant="permanent">
      <List>
        <ListItem button component={Link} to="/dashboard">
          <DashboardIcon />
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/my-tasks">
          <AssignmentIcon />
          <ListItemText primary="My Tasks" />
        </ListItem>
        <ListItem button component={Link} to="/deadlines">
          <EventNoteIcon />
          <ListItemText primary="Deadlines" />
        </ListItem>
        <ListItem button component={Link} to="/planner">
          <MenuIcon />
          <ListItemText primary="Planner" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
