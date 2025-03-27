const express = require("express");
const connectDB = require("./config/db");
const routes = require("./routes/routes");
require("dotenv").config();
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", routes);

// Start server
const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
