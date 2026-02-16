import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// Import routes
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import contactRoute from "./route/contact.route.js"; // Added import for contact route

const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "*";
app.use(
  cors({
    origin: CLIENT_ORIGIN,
  })
);
app.use(express.json());

// Get MongoDB URL and port from environment variables
const URL = process.env.MongoDBURL;
const PORT = process.env.PORT || 4001;

if (!URL) {
  console.error("Missing MongoDBURL in environment.");
  process.exit(1);
}

// MongoDB Connection
mongoose.connect(URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Define routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/contact", contactRoute);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
