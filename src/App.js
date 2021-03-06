import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Layout/Header/Header";
import Dashboard from "./containers/Dashboard/Dashboard";
import Projects from "./containers/Projects/Projects";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
}));

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />

        <Header handleDrawerOpen={handleDrawerOpen} open={open} />

        <Sidebar handleDrawerClose={handleDrawerClose} open={open} />
        <Switch>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// import React from "react";
// import clsx from "clsx";
// import { makeStyles } from "@material-ui/core/styles";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Box from "@material-ui/core/Box";
// import Container from "@material-ui/core/Container";
// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
// import Copyright from "./components/Layout/Footer/Copyright/Copyright";
// import Sidebar from "./components/Sidebar/Sidebar";
// import Header from "./components/Layout/Header/Header";
// // import Chart from './Chart';
// // import Deposits from './Deposits';
// // import Orders from './Orders';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//   },

//   toolbar: {
//     paddingRight: 24, // keep right padding when drawer closed
//   },

//   appBarSpacer: theme.mixins.toolbar,
//   content: {
//     flexGrow: 1,
//     height: "100vh",
//     overflow: "auto",
//   },
//   container: {
//     paddingTop: theme.spacing(4),
//     paddingBottom: theme.spacing(4),
//   },
//   paper: {
//     padding: theme.spacing(2),
//     display: "flex",
//     overflow: "auto",
//     flexDirection: "column",
//   },
//   fixedHeight: {
//     height: 240,
//   },
// }));

// export default function App() {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(true);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };
//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

//   return (
//     <div className={classes.root}>
//       <CssBaseline />

//       <Header handleDrawerOpen={handleDrawerOpen} open={open} />

//       <Sidebar handleDrawerClose={handleDrawerClose} open={open} />

//       <main className={classes.content}>
//         <div className={classes.appBarSpacer} />
//         <Container maxWidth="lg" className={classes.container}>
//           <Grid container spacing={3}>
//             {/* Chart */}
//             <Grid item xs={12} md={8} lg={9}>
//               <Paper className={fixedHeightPaper}>{/* <Chart /> */}</Paper>
//             </Grid>
//             {/* Recent Deposits */}
//             <Grid item xs={12} md={4} lg={3}>
//               <Paper className={fixedHeightPaper}>{/* <Deposits /> */}</Paper>
//             </Grid>
//             {/* Recent Orders */}
//             <Grid item xs={12}>
//               <Paper className={classes.paper}>{/* <Orders /> */}</Paper>
//             </Grid>
//           </Grid>
//           <Box pt={4}>
//             <Copyright />
//           </Box>
//         </Container>
//       </main>
//     </div>
//   );
// }
