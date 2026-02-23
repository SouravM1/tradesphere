require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { HoldingsModel } = require("./model/HoldingsModels");
const { PositionsModel } = require("./model/PositionsModel");
const authRoutes = require("./routes/authRoutes");
const { authenticate } = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;


// ✅ VERY SIMPLE CORS (NO RESTRICTION FOR NOW)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Handle preflight manually
app.options("*", cors());

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());


// Health
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Auth routes
app.use("/auth", authRoutes);

// Protected routes
app.get("/allHoldings", authenticate, async (req, res) => {
  const data = await HoldingsModel.find({});
  res.json(data);
});

app.get("/allPositions", authenticate, async (req, res) => {
  const data = await PositionsModel.find({});
  res.json(data);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

mongoose.connect(uri)
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });
  })
  .catch(err => {
    console.error("Mongo error:", err);
  });