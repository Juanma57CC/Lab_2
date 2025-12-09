import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import config from "../../config/config.js"; 

// SIGN IN
const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    if (!user.authenticate(req.body.password)) {
      return res
        .status(401)
        .json({ error: "Email and password don't match." });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret);

    // store token in cookie
    res.cookie("t", token, { expire: new Date() + 9999 });

    // send token + user (include role)
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // ✅ needed for admin in frontend
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Could not sign in" });
  }
};

// SIGN OUT
const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({ message: "signed out" });
};

// AUTH MIDDLEWARE (JWT required)
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  requestProperty: "auth", // Will set req.auth = { _id: ... }
});

// CHECK SAME USER (for user-only resources)
const hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && String(req.profile._id) === String(req.auth._id);

  if (!authorized) {
    return res.status(403).json({ error: "User is not authorized" });
  }
  next();
};

// ADMIN CHECK
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.auth._id);
    if (!user || user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Admin resource. Access denied." });
    }
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not verify admin." });
  }
};

export default { signin, signout, requireSignin, hasAuthorization, isAdmin };
