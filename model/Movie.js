import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
  },

  genre: {
    type: String,
  },

  rating: {
    type: Number,
  },

  releaseYear: {
    type: Number,
  },

  image: {
    type: String,
  },

  cloudinary_Id: {
    type: String,
  },

},
{ timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;