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

// middleware
app.use(helmet());

// app.use(cors({
//   origin: process.env.CLIENT_URL || "*",
//   credentials: true
// }));

app.use(cors({
  origin: function(origin, callback) {
    const allowed = process.env.CLIENT_URL;

    if (!origin || origin === allowed) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true
}));


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

// error handler LAST
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