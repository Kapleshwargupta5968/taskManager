const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require(".//config/database");
connectDB();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(cookieParser());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);

module.exports = app;