const express = require("express");
const { getMovies, filteredMovies } = require("../controllers/MovieController");
const { getGenres } = require("../controllers/GenreController");
// const { getMovies, filteredMovies } = require("../Controllers/MovieController");
const {
  registerUser,
  login,
  getUserInfo,
  getUsers,
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", login);
router.post("/register", registerUser);
router.get("/register", getUsers);
router.get("/userinfo", getUserInfo);
router.get("/movies", getMovies);
router.get("/filteredMovies", filteredMovies);
router.get("/genre", getGenres);

module.exports = router;
