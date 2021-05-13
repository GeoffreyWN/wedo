const express = require("express");
const app = express();
const connectDB = require("./config/db");
const projectRouter = require("./routes/projects"),
  taskRouter = require("./routes/tasks");

//CONNECT DB
connectDB();

// init midddleware
app.use(express.json({ extended: false }));

//handle cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Origin, Accept, Content-Type")
  next()
})

//routeS
app.get("/", (req, res) => {
  res.send("wedo server is live");
});
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/tasks", taskRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`success: server running on port ${PORT}`));
