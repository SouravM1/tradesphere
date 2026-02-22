const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/UserModel");

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable must be set in production.");
}

/**
 * Authentication middleware: verifies JWT and attaches user to req.user
 */
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await UserModel.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found. Token invalid." });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please login again." });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token." });
    }
    return res.status(500).json({ message: "Authentication failed." });
  }
};

/**
 * Authorization middleware: allows only specified roles
 * Usage: authorize("admin") or authorize("admin", "user")
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated." });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "You do not have permission to access this resource." });
    }
    next();
  };
};

module.exports = { authenticate, authorize, JWT_SECRET };
