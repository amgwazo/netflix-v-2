const bodyParser = require("body-parser");
const Genre = require("../models/genreSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

//list all genres
exports.getGenres = async (req, res) => {
   try {
     const data = await Genre.find();
     res.json(data);
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
  
};

  