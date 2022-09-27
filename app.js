const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/UserRoutes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/v1/user", authRoutes);

module.exports = app;
