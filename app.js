const express = require('express');
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
app.use(helmet());
app.use(cors());

// مسار تجريبي للتأكد إن السيرفر شغال وبيستقبل طلبات
app.get('/api', (req, res) => {
  res.json({ message: "Welcome to Eventify API 🚀" });
});

// Running The Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});