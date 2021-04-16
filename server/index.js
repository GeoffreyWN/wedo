const express = require("express");
const app = express();
const connectDB = require("./config/db");
const projectRouter = require("./routes/projects"),
  taskRouter = require("./routes/tasks");

//CONNECT DB
connectDB();

// init midddleware
app.use(express.json({ extended: false }));

//routeS
app.get("/", (req, res) => {
  res.send("wedo server is live");
});
app.use("/api/v1/projects", projectRouter);
// app.use("/api/v1/tasks", taskRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`success: server running on port ${PORT}`));
