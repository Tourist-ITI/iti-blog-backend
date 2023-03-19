// core modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

//parsing
const bodyParser = require("body-parser");

//custom modules
const authRouter = require("./routers/auth/user");
const userRouter = require("./routers/user/user");

const { errorHandler } = require("./utils/responseHandler");
const postRouter = require("./routers/post/post.router");

//handle dotenv
dotenv.config();

// variables
const port = 3001;
const app = express();

//middleware
// cors
app.use(cors());

//body parser
app.use(express.json());

app.use(express.static(path.join(__dirname, "uploads")));

// morgan
app.use(morgan("dev"));
// routes
app.use("/v1/users", authRouter);
app.use("/v1/user/profile", userRouter);
app.use("/v1/post", postRouter);

// route not exist
app.all("*", (req, res, next) => {
  next(errorHandler(`can't found route: ${req.originalUrl}`, 404));
});

//database server
mongoose.connect(process.env.DATABASE).then((_) => {
  console.log("database is connected successfully");
});

app.use((err, req, res, next) => {
  console.error("\n<<<<<<<<<<<<<<Error>>>>>>>>>>>>>>\n", err);
  res.status(err.status || 400).send(err.response);
});

app.listen(port, () => console.log(`Server is listening on port : ${port}`));
