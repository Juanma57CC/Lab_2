import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import path from "path";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import educationRoutes from "./routes/education.routes.js";
import projectRoutes from "./routes/project.routes.js";
import contactRoutes from "./routes/contact.routes.js";

const CURRENT_WORKING_DIR = process.cwd();

const app = express();

// === CORS SETUP ===
// Allow both: your deployed frontend + local dev
const allowedOrigins = [
  process.env.CLIENT_URL,           // e.g. https://lab-4-i2aj.onrender.com (Render)
  "http://localhost:5173",          // local dev
].filter(Boolean); // remove undefined

console.log("CORS allowed origins:", allowedOrigins);

app.use(
  cors({
    origin: function (origin, callback) {
      // For tools like Thunder Client (no origin), allow it
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        // This origin is allowed
        return callback(null, true);
      }
      // Origin not allowed
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// === Core middleware ===
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());

// Serve static assets from /dist (if ever used)
app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

// Routes
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", educationRoutes);
app.use("/", projectRoutes);
app.use("/", contactRoutes);

// Auth error handling (express-jwt)
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.error(err);
  }
});

export default app;
