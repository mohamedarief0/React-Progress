const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
// app.use(cors());
// Allow specific origin (e.g. React app running on localhost:3000)
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.1.4:3000"], // replace with your IP or domain
    credentials: true,
  })
);
app.use(express.json());

// db connect
connectDB();
// Routes
app.use("/api/users", userRoutes);

// Error handler
app.use(errorHandler);

// Server start
app.listen(PORT, () => {
  console.log(`.....Server running on http://localhost:${PORT}`);
});
