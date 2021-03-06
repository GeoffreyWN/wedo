import React, { useState } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
// import Button from "@material-ui/core/Button";

import DashboardIcon from "@material-ui/icons/Dashboard";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AddProject from "../Forms/AddProject";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const SidebarOptions = () => {
  const classes = useStyles();
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [tasksOpen, setTasksOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  const handleProjects = () => {
    setProjectsOpen(!projectsOpen);
  };
  const handleTasks = () => {
    setTasksOpen(!tasksOpen);
  };
  const handleListItemClick = (e, index) => {
    setSelectedIndex(index);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <List component="nav" className={classes.root}>
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={(e) => handleListItemClick(e, 0)}
          component={Link}
          to="/dashboard"
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <Divider />

        <ListItem button onClick={handleProjects}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Projects" />
          {projectsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={projectsOpen} timeout="auto" unmountOnExit>
          <List component="nav" disablePadding>
            <ListItem
              button
              className={classes.nested}
              selected={selectedIndex === 1}
              onClick={(e) => handleListItemClick(e, 1)}
            >
              <ListItemIcon>
                <AddCircleOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Add Project" onClick={handleOpenDialog} />

              <Dialog
                divider="true"
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDialog}
                aria-labelledby="add-dialog-title"
                aria-describedby="add-dialog-description"
              >
                <DialogTitle id="add-dialog-title">{"Add Project"}</DialogTitle>
                <DialogContent>
                  <AddProject handleCloseDialog={handleCloseDialog} />
                </DialogContent>
                <DialogActions>{/* none */}</DialogActions>
              </Dialog>
            </ListItem>

            <ListItem
              button
              className={classes.nested}
              selected={selectedIndex === 2}
              onClick={(e) => handleListItemClick(e, 2)}
              component={Link}
              to="/projects"
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="All Projects" />
            </ListItem>
          </List>
        </Collapse>

        <Divider />

        <ListItem button onClick={handleTasks}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Tasks" />
          {tasksOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={tasksOpen} timeout="auto" unmountOnExit>
          <List component="nav" disablePadding>
            <ListItem
              button
              className={classes.nested}
              selected={selectedIndex === 3}
              onClick={(e) => handleListItemClick(e, 3)}
            >
              <ListItemIcon>
                <AddCircleOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Add Task" />
            </ListItem>

            <ListItem
              button
              className={classes.nested}
              selected={selectedIndex === 4}
              onClick={(e) => handleListItemClick(e, 4)}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="All Tasks" />
            </ListItem>

            <ListItem
              button
              className={classes.nested}
              selected={selectedIndex === 5}
              onClick={(e) => handleListItemClick(e, 5)}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Today's Tasks" />
            </ListItem>

            <ListItem
              button
              className={classes.nested}
              selected={selectedIndex === 6}
              onClick={(e) => handleListItemClick(e, 6)}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Next 7 Days" />
            </ListItem>

            <ListItem
              button
              className={classes.nested}
              selected={selectedIndex === 7}
              onClick={(e) => handleListItemClick(e, 7)}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Pending Tasks" />
            </ListItem>

            <ListItem
              button
              className={classes.nested}
              selected={selectedIndex === 8}
              onClick={(e) => handleListItemClick(e, 8)}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Completed Tasks" />
            </ListItem>
          </List>
        </Collapse>
      </List>

      <Divider />

      <List>
        <ListSubheader inset>Settings</ListSubheader>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </>
  );
};

export default SidebarOptions;
