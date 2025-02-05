require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("AI Romantic App Backend is Running!");
});

//Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Upload Routes
const uploadRoutes = require("./routes/uploadRoutes");
app.use("/api/upload", uploadRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
