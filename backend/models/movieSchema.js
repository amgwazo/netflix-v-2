
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  backdrop_path: {
    type: String,
    required: true,
  },
  genre_ids: {
    type: [Number],
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  original_language: {
    type: String,
    required: true,
  },
  original_title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  popularity: {
    type: Number,
    required: true,
  },
  poster_path: {
    type: String,
    required: true,
  },
  release_date: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  video: {
    type: Boolean,
    required: true,
  },
  vote_average: {
    type: Number,
    required: true,
  },
  vote_count: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Movie", movieSchema);




// const mongoose = require('mongoose');

// const movieSchema = new mongoose.Schema({
//   Title: { type: String, required: true, unique: true },
//   Image: { type: String, required: true, unique: true },
//   MainCategory: { type: String, required: true },
//   Genre: { type: String, required: true },
//   File_Id: { type: String, required: true, unique: true },
// });

// const Movie = mongoose.model('Movie', movieSchema);

// module.exports =    Movie;

