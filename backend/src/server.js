import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import newsletterRouter from "./routes/newsletter.js";
import subscribersRouter from "./routes/subscribers.js";
import projectRouter from "./routes/projectRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/subscribers", subscribersRouter);
app.use("/api/newsletter", newsletterRouter);
app.use("/api/projects", projectRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Something went wrong. Please try again.",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(
    `📧 Newsletter endpoint: http://localhost:${PORT}/api/newsletter/subscribe`,
  );
  console.log(
    `📁 Projects endpoint: http://localhost:${PORT}/api/projects`,
  );
});
