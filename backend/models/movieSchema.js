const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  Title: { type: String, required: true, unique: true },
  Image: { type: String, required: true, unique: true },
  MainCategory: { type: String, required: true },
  Genre: { type: String, required: true },
  File_Id: { type: String, required: true, unique: true },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports =    Movie;