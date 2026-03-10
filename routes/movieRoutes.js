import express from "express";
import movieController from "../controllers/movieController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/add", upload.single("image"), movieController.createMovie);

router.get("/allMovie", movieController.allMovie);

router.get("/:id", movieController.getMovie);

router.patch(
  "/update/:id",
  upload.single("image"),
  movieController.updateMovie
);

router.delete("/delete/:id", movieController.deleteMovie);

export default router;