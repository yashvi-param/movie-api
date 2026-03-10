import Movie from "../model/Movie.js";
import HttpError from "../middleware/httpError.js";
import cloudinary from "../config/cloudinary.js";


const createMovie = async (req, res, next) => {
  try {

    const {
      title,
      description,
      genre,
      rating,
      releaseYear
    } = req.body;

    if (!req.file) {
      return next(new HttpError("image is required", 400));
    }

    const movie = await Movie.create({
      title,
      description,
      genre,
      rating,
      releaseYear,
      image: req.file.path,
      cloudinary_Id: req.file.filename,
    });

    res.status(201).json({
      success: true,
      movie,
    });

  } catch (error) {
    next(error);
  }
};


const allMovies = async (req, res, next) => {
  try {

    const movies = await Movie.find({});

    if (movies.length === 0) {
      return res.status(200).json({
        message: "No movies found",
      });
    }

    res.status(200).json({
      success: true,
      movies,
    });

  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};


const getMovie = async (req, res, next) => {
  try {

    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return next(new HttpError("Movie not found", 404));
    }

    res.status(200).json({
      success: true,
      movie,
    });

  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const updateMovie = async (req, res, next) => {
  try {

    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return next(new HttpError("Movie not found", 404));
    }

    if (!req.body || Object.keys(req.body).length === 0 && !req.file) {
      return next(new HttpError("No update data provided", 400));
    }

    const updates = Object.keys(req.body);

    const allowedUpdates = [
      "title",
      "description",
      "genre",
      "rating",
      "releaseYear",
    ];

    const isValid = updates.every((field) =>
      allowedUpdates.includes(field)
    );

    if (!isValid) {
      return next(new HttpError("Invalid update fields", 400));
    }

    updates.forEach((update) => {
      movie[update] = req.body[update];
    });

    if (req.file) {

      if (movie.cloudinary_Id) {
        await cloudinary.uploader.destroy(movie.cloudinary_Id);
      }

      movie.image = req.file.path;
      movie.cloudinary_Id = req.file.filename;
    }

    await movie.save();

    res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      movie,
    });

  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const deleteMovie = async (req, res, next) => {
  try {

    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return next(new HttpError("Movie not found", 404));
    }

    if (movie.cloudinary_Id) {
      await cloudinary.uploader.destroy(movie.cloudinary_Id);
    }

    await movie.deleteOne();

    res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
    });

  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default {
  createMovie,
  allMovies,
  getMovie,
  updateMovie,
  deleteMovie,
};