require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { HoldingsModel } = require("./model/HoldingsModels");
const { PositionsModel } = require("./model/PositionsModel");
const authRoutes = require("./routes/authRoutes");
const { authenticate } = require("./middleware/authMiddleware");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();


// ✅ FIXED CORS CONFIG (works for Vercel + Railway + Localhost)
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
   "https://tradesphere-alpha.vercel.app/",
  "https://tradesphere-git-main-souravs-projects-cd880c32.vercel.app/",
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (mobile apps, curl, postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// handle preflight
app.options("*", cors());


// security + logging
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.use(bodyParser.json());


// ✅ Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});


// ✅ Auth routes
app.use("/auth", authRoutes);


// ✅ Protected routes
app.get("/allHoldings", authenticate, async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch holdings" });
  }
});


app.get("/allPositions", authenticate, async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch positions" });
  }
});


// ✅ Global error handler (MUST BE LAST)
app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});


// ✅ Connect DB and start server
mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });