const express = require("express");
const bodyParser = require("body-parser");
const Movie = require("../models/movieSchema");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//list all movies
router.get("/movies",async (req, res) => {
   try {
    const data = await Movie.find();
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
