const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");
const queryRoutes = require("./routes/queryRoutes");

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI;

// Remove deprecated options
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }); 

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
