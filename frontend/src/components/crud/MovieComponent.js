import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../Navbar";
import './MovieComponent.css';

let apiURL = process.env.REACT_APP_BASE_URL_DEV;

if (process.env.NODE_ENV === "production") {
  apiURL = process.env.REACT_APP_BASE_URL_PROD;
}

const MovieComponent = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    // initialize with default values or empty strings
  });
  const [updatedMovie, setUpdatedMovie] = useState({
    // initialize with default values or empty strings
  });
  const [movieIdToDelete, setMovieIdToDelete] = useState("");

  // Define fetchMovies outside useEffect
  const fetchMovies = useCallback(async () => {

    fetch(`${apiURL}/filteredMovies`, {
      // fetch("http://localhost:3001/api/filteredMovies", {
      method: "GET",
      headers: {
        "x-access-token": sessionStorage.getItem("ltk"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.movies);
        console.log(`${data.movies?.length} movies fetched` );
        // setMovieCount(data.movies.length);
      })
      .catch((err) => {
        console.log(err);
      });

    // try {
    //   const response = await fetch("/api/movies"); // Replace with your actual API endpoint
    //   const data = await response.json();
    //   setMovies(data);
    // } catch (error) {
    //   console.error("Error fetching movies:", error);
    // }
  }, []);

  // Fetch all movies on component mount
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]); // Include fetchMovies in the dependency array

 const handleInputChange = (e) => {
   const { name, value, type, checked } = e.target;
   setNewMovie((prevMovie) => ({
     ...prevMovie,
     [name]: type === "checkbox" ? checked : value,
   }));
 };

  // Create new movie
  const handleCreateMovie = async () => {
    try {
      const response = await fetch(`${apiURL}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie),
      });

      if (response.ok) {
        setNewMovie({
          // Reset newMovie state after successful creation
        });
        // Fetch updated list of movies
        fetchMovies();
      } else {
        console.error("Error creating movie:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

  // Update movie
  const handleUpdateMovie = async () => {
    try {
      const response = await fetch(`/api/movies/${updatedMovie.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMovie),
      });

      if (response.ok) {
        setUpdatedMovie({
          // Reset updatedMovie state after successful update
        });
        // Fetch updated list of movies
        fetchMovies();
      } else {
        console.error("Error updating movie:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  // Delete movie
  const handleDeleteMovie = async () => {
    try {
      const response = await fetch(`/api/movies/${movieIdToDelete}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMovieIdToDelete("");
        // Fetch updated list of movies
        fetchMovies();
      } else {
        console.error("Error deleting movie:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <>
      <div className="h-100 bg-black">
        <div className="nav-bar d-flex flex-column bg-black  ">
          <Navbar />
        </div>

        <div className="movie-form">
          <h2>Create Movie</h2>

          <form className="form">
            <div className="form-row">
              <div className="form-col">
                <label htmlFor="_id">ID:</label>
                <input
                  type="text"
                  id="_id"
                  name="_id"
                  value={newMovie._id}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-col">
                <label htmlFor="backdrop_path">Backdrop Path:</label>
                <input
                  type="text"
                  id="backdrop_path"
                  name="backdrop_path"
                  value={newMovie.backdrop_path}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Add similar blocks for other fields based on the schema */}

            <button type="button" onClick={handleCreateMovie}>
              Create Movie
            </button>
          </form>

          {/* Display the list of movies */}
          <h2>Movies</h2>
          <ul>
            {movies?.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
  
};

export default MovieComponent;

