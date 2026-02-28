require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const { authenticate } = require("./middleware/authMiddleware");
const { HoldingsModel } = require("./model/HoldingsModels");
const { PositionsModel } = require("./model/PositionsModel");

const app = express();

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

// security
app.use(helmet());

// FIXED CORS
const allowedOrigins = [
  "https://tradesphere-alpha.vercel.app",
  "http://localhost:3000"
];

app.use(cors({
  origin: function(origin, callback) {

    if (!origin) return callback(null, true);

    const normalizedOrigin = origin.replace(/\/$/, "");

    if (allowedOrigins.includes(normalizedOrigin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(null, false);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options(/^\/.*$/, cors());

// middleware
app.use(express.json());
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.send("TradeSphere backend running");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRoutes);

app.get("/allHoldings", authenticate, async (req, res) => {
  const data = await HoldingsModel.find();
  res.json(data);
});

app.get("/allPositions", authenticate, async (req, res) => {
  const data = await PositionsModel.find();
  res.json(data);
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// connect db
mongoose.connect(uri)
.then(() => {

  console.log("MongoDB connected");

  app.listen(PORT, () => {
    console.log("Server running on port", PORT);
  });

})
.catch(err => {
  console.error("MongoDB error:", err);
  process.exit(1);
});