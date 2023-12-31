import React, { useCallback, useEffect, useState } from "react";

let apiURL = process.env.REACT_APP_BASE_URL_DEV;

if (process.env.NODE_ENV === "production") {
  apiURL = process.env.REACT_APP_BASE_URL_PROD;
}


const MovieComponent = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    // initialize with default values or empty strings
    adult: false,
    backdrop_path: "/94hfGX8TSFJdgN0Upq3xnQVAoNW.jpg",
    genre_ids: [10770, 35, 10749],
    _id: 1027338,
    id: 1027338,
    original_language: "en",
    original_title: "We Wish You a Married Christmas",
    overview:
      "Becca and Robby are a married couple having a hard time connecting with each other as the holidays approach. Just before Christmas, they head to a cozy Vermont inn at the advice of their marriage coach so they can recharge. Their weekend away gets unexpectedly extended when a mishap puts their car out of commission and just may put them on the road to a very happily married Christmas.",
    popularity: 11.656,
    poster_path: "/cZjDTEpZ0SPER7NuuIIjPlGwEP8.jpg",
    release_date: "2022-10-22",
    title: "We Wish You a Married Christmas",
    video: false,
    vote_average: 5.5,
    vote_count: 14,
  });
  const [updatedMovie, setUpdatedMovie] = useState({
    // initialize with default values or empty strings
    adult: false,
    backdrop_path: "",
    genre_ids: [],
    id: 1027338,
    original_language: "",
    original_title: "",
    overview: "",
    popularity: 0,
    poster_path: "",
    release_date: "",
    title: "",
    video: false,
    vote_average: 0,
    vote_count: 0,
  });
  const [movieIdToDelete, setMovieIdToDelete] = useState("");

  const [checked, setChecked] = useState(false);
  // const [values, setValues] = useState(initialValues);

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
        console.log(`${data.movies?.length} movies fetched`);
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

  useEffect(() => {
    console.log("useEffect is running");
    fetchMovies();
  }, [fetchMovies]);

  const handleInputChange = (e) => {
    // const { name, value } = e.target;
    // setValues({
    //   ...values,
    //   [name]: value,
    // });
    const { name, value, type, checked } = e.target;
    setNewMovie({
      ...newMovie,
      [name]: value,
      [name]: type === "checkbox" ? checked : value,
    });
    // const { name, value, type, checked } = e.target;
    // setNewMovie((prevMovie) => ({
    //   ...prevMovie,
    //   [name]: type === "checkbox" ? checked : value,
    // }));
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
          adult: false,
          backdrop_path: "",
          genre_ids: [],
          id: '',
          original_language: "",
          original_title: "",
          overview: "",
          popularity: 0,
          poster_path: "",
          release_date: "",
          title: "",
          video: false,
          vote_average: 0,
          vote_count: 0,
        });
        // Fetch updated list of movies
        fetchMovies();
      } else {
         const errorData = await response.json(); 
         if (errorData && errorData.error) {
          //  console.error(`Error creating movie: ${errorData.error}`);
            alert(`Error creating movie: ${errorData.error}`);
         } else {
          //  console.error(`Error creating movie: ${response.statusText}`);
            alert(`Error creating movie: ${response.statusText}`);
         }
      }
    } catch (error) {
      // console.error("Error creating movie:", error);
       alert(`Error creating movie: ${error}`);
    }
  };

  return (
    <>
      <div className=" h-100 bg-black">
        <div className="container pt-5">
          <div className="panel panel-info mt-5  movie-form">
            <hr />
            <div className="panel-heading">
              <h3 className="text-secondary">Movie Details</h3>
            </div>
            <div className="panel-body border border-dark rounded p-3 bg-dark">
              <div className="row">
                <div className="mt-3 col-md-6 form-group">
                  <label for="fname" className="control-label">
                    Movie ID
                  </label>
                  <input
                    className="form-control"
                    id="id"
                    name="id"
                    value={newMovie?.id}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-3 col-md-6 form-group">
                  <label for="title" className="control-label">
                    Title
                  </label>
                  <input
                    className="form-control"
                    id="title"
                    name="title"
                    value={newMovie?.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-3 col-md-6 form-group">
                  <label for="original_title" className="control-label">
                    Original Title
                  </label>
                  <input
                    className="form-control"
                    id="original_title"
                    name="original_title"
                    value={newMovie?.original_title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-3 col-md-6 form-group">
                  <label for="release_date" className="control-label">
                    Release Date
                  </label>
                  <input
                    className="form-control"
                    id="release_date"
                    name="release_date"
                    value={newMovie?.release_date}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mt-3 col-md-6 form-group">
                  <label for="backdrop_path" className="control-label">
                    Backdrop Path
                  </label>
                  <input
                    className="form-control"
                    id="backdrop_path"
                    name="backdrop_path"
                    value={newMovie?.backdrop_path}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mt-3 col-md-3 form-group">
                  <label for="popularity" className="control-label">
                    Popularity
                  </label>
                  <input
                    className="form-control"
                    id="popularity"
                    name="popularity"
                    value={newMovie?.popularity}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-3 col-md-12 form-group">
                  <label for="video" className="control-label align-middle ">
                    Video
                    <input
                      type="checkbox"
                      checked={newMovie?.video}
                      className="ms-2"
                      id="video"
                      name="video"
                      // value={newMovie?.video}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>

                <div className="mt-3 col-md-6 form-group">
                  <label for="poster_path" className="control-label">
                    Poster Path
                  </label>
                  <input
                    className="form-control"
                    id="poster_path"
                    name="poster_path"
                    value={newMovie?.poster_path}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mt-3 col-md-2 form-group">
                  <label for="vote_count" className="control-label">
                    Vote Count
                  </label>
                  <input
                    className="form-control"
                    id="vote_count"
                    name="vote_count"
                    value={newMovie?.vote_count}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-3 col-md-3 form-group">
                  <label for="original_language" className="control-label">
                    Original Language
                  </label>
                  <input
                    className="form-control"
                    id="original_language"
                    name="original_language"
                    value={newMovie?.original_language}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mt-3 col-md-3 form-group">
                  <label for="genre_ids" className="control-label">
                    Genre Ids
                  </label>
                  <input
                    className="form-control"
                    id="genre_ids"
                    name="genre_ids"
                    value={newMovie?.genre_ids}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-3 col-md-12 form-group">
                  <label for="overview" className="control-label">
                    Overview
                  </label>
                  <textarea
                    className="form-control textarea-movie"
                    id="overview"
                    name="overview"
                    rows={10}
                    value={newMovie?.overview}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <button
                className="btn btn-danger mt-3"
                onClick={handleCreateMovie}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieComponent;
