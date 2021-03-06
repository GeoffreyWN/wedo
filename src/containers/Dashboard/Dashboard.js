import React from "react";
import { Helmet } from "react-helmet";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Copyright from "../../components/Layout/Footer/Copyright/Copyright";
import LatestProjects from "../../components/LatestProjects";

// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  widget: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    textAlign: "center",
  },
  widgetTitle: {
    fontSize: "20px",
    fontFamily: "Mulish",
    fontWeight: "400",
    margin: 0,
    color: "gray",
  },
  widgetStat: {
    fontSize: "45px",
    fontFamily: "Mulish",
    fontWeight: "400",
    margin: "10px auto 5px auto",
    // color: "gray"
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <>
      <Helmet>
        <title>WeDo | Dashboard</title>
      </Helmet>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.widget}>
                <h6 className={classes.widgetTitle}>Projects</h6>
                <h3 className={classes.widgetStat}>16</h3>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.paper}>
                <h6 className={classes.widgetTitle}>Today's Tasks</h6>
                <h3 className={classes.widgetStat}>8</h3>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.widget}>
                <h6 className={classes.widgetTitle}> Overdue Tasks</h6>
                <h3 className={classes.widgetStat}>5</h3>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper className={classes.widget}>
                <h6 className={classes.widgetTitle}>Completed Tasks</h6>
                <h3 className={classes.widgetStat}>20</h3>
              </Paper>
            </Grid>

            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>Chart</Paper>
            </Grid>
            {/* info */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}> INFO </Paper>
            </Grid>
            {/* Recent Projects & Tasks */}
            <Grid item xs={6} sm={6}>
              <LatestProjects />
            </Grid>
            <Grid item xs={6} sm={6}>
              <LatestProjects />
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </>
  );
}

// import React from "react";
// import { Helmet } from "react-helmet";
// import clsx from "clsx";
// import { makeStyles } from "@material-ui/core/styles";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Box from "@material-ui/core/Box";
// import Container from "@material-ui/core/Container";
// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
// import Copyright from "../../components/Layout/Footer/Copyright/Copyright";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import Header from "../../components/Layout/Header/Header";
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

// export default function Dashboard() {
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
//       <Helmet>
//             <title>WeDo | My Title</title>
//       </Helmet>
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
