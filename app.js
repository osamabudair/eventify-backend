const express = require('express');
const path = require('path');
const dotenv = require("dotenv").config();
const connectToDB = require('./config/db');
const helmet = require("helmet");
const cors = require("cors");

// Connection To Database
connectToDB();

// Init App
const app = express();

// Apply Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

// Running The Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});