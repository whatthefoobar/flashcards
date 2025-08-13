import express, { json } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import flashcardRoutes from "./routes/flashcards.js";
import connectDB from "./config/connectToDB.js";

dotenv.config();

connectDB();

const app = express();
app.use(json());

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
