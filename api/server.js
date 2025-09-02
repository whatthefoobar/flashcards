import express, { json } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import flashcardRoutes from "./routes/flashcards.js";
import connectDB from "./config/connectToDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // your React frontend
    credentials: true, // if you're using cookies/auth headers
  })
);

app.use(json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/flashcards", flashcardRoutes);
app.get("/", (req, res) => {
  res.send(`Flashcard app backend is running on port ${PORT}`);
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`
  )
);
