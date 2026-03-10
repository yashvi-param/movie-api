import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import HttpError from "./middleware/httpError.js";
import movieRoutes from "./routes/movieRoutes.js";

dotenv.config({ path: "./.env" });

const app = express();

app.use(cors());
app.use(express.json());

app.use("/movie", movieRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Movie API is running successfully 🎬",
  });
});

app.use((req, res, next) => {
  next(new HttpError("Requested route not found", 404));
});

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

startServer();

export default app;