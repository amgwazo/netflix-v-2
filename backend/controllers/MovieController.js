const express = require("express");
const bodyParser = require("body-parser");
const Movie = require("../models/movieSchema");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//list all movies
router.get("/movies", (req, res) => {
  Movie.find({}, (err, movie) => {
    if (err) throw err;
    console.log(JSON.stringify(movie));
    res.send(movie);
  });
});


module.exports = router;