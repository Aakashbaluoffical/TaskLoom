import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import MyTasks from "./components/MyTasks/MyTasks";
import Deadlines from "./components/Deadlines/Deadlines";
import Planner from "./components/Planner/Planner";
import Sidebar from "./components/SideBar/SideBar";
import TopBar from "./components/TopBar/TopBar";
import Register from "./components/Register/Register";
import "./App.css";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row", // Arrange children in a row
    minHeight: "100vh",
  },
  content: {
    flex: 1, // Allow the content area to grow and fill the remaining space
    padding: "20px", // Adjust padding as needed
    marginLeft: "145px",
    marginRight: "10px",
  },
});

function App() {
  const classes = useStyles();
  return (
    <Router>
      <Routes>
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
        <Route
          path="/*"
          element={
            <>
              <TopBar />
              <div className={classes.root}>
                <Sidebar />
                <div className={classes.content}>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/my-tasks" element={<MyTasks />} />
                    <Route path="/deadlines" element={<Deadlines />} />
                    <Route path="/planner" element={<Planner />} />
                    <Route path="/" element={<Navigate to="/user/login" />} />
                    {/* Add routes for other pages here */}
                  </Routes>
                </div>
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
