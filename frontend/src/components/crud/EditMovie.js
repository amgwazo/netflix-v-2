import React, { useEffect, useState } from "react";

let apiURL = process.env.REACT_APP_BASE_URL_DEV;

if (process.env.NODE_ENV === "production") {
  apiURL = process.env.REACT_APP_BASE_URL_PROD;
}

const EditMovie = ({setTitle, title, movie, onClose, operation }) => {
  // const EditMovie = ({props }) => {
  const [updatedMovie, setUpdatedMovie] = useState({
    adult: movie.adult,
    backdrop_path: movie.backdrop_path,
    genre_ids: movie.genre_ids,
    id: movie.id,
    original_language: movie.original_language,
    original_title: movie.original_title,
    overview: movie.overview,
    popularity: movie.popularity,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    title: movie.title,
    video: movie.video,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count,
  });

  const handleInputChange = (e) => {
    console.log("input change");

    const { name, value, type, checked } = e.target;
    setUpdatedMovie({
      ...updatedMovie,
      [name]: value,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Update movie
  const handleCreateMovie = async () => {

    try {
      // const response = await fetch(`/api/movies/${updatedMovie.id}`, {
      const response = await fetch(`${apiURL}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMovie),
      });

      if (response.ok) {
        setUpdatedMovie({ 
          // Reset updatedMovie state after successful update
          adult: false,
          backdrop_path: "",
          genre_ids: [],
          id: "",
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
      } else {
        console.error("Error Creating movie:", response.statusText);
      }
    } catch (error) {
      console.error("Error Creating movie:", error);
    }
  };

  // Update movie
  const handleUpdateMovie = async () => {
    const queryParams = new URLSearchParams({
      id: movie.id,
    });

    try {
      // const response = await fetch(`/api/movies/${updatedMovie.id}`, {
      const response = await fetch(`${apiURL}/movies?${queryParams}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMovie),
      });

      if (response.ok) {
        setUpdatedMovie({
          // Reset updatedMovie state after successful update
          adult: false,
          backdrop_path: "",
          genre_ids: [],
          id: "",
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
      } else {
        console.error("Error updating movie:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  useEffect(() => {
    console.log("useEffect is running");
    console.log(updatedMovie);
  }, [updatedMovie]);

  const handleSaveMovie = async () => {
    if (operation === "addMovie") {
      handleCreateMovie();
    } else {
      handleUpdateMovie();
    }
    setTitle(movie.title);
    onClose();
  };

  return (
    <>
      <div className="w-75 ">
        <input
          type="text"
          className="col-8 mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Search by title"
        />

      </div>
      <div className=" h-100 bg-black m-0 p-0">
        <div className="container bg-white m-0 p-0">
          <div className="panel panel-dark  movie-form">
            {/* <hr className="bg-white" /> */}
            <div className="panel-heading">
              <h3 className="text-secondary">
                {operation === "addMovie" ? "New Movie" : "Edit Movie"}
              </h3>
            </div>
            <div className="panel-body border border-dark rounded p-3 m-0 bg-dark">
              <button
                className="btn btn-warning mt-3 float-end text-white"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger mt-3 me-2 float-end"
                onClick={handleSaveMovie}
              >
                {operation === "addMovie" ? "Add" : "Save"}
              </button>

              <div className="row">
                <div className="mt-3 col-md-6 form-group">
                  <label for="id" className="control-label">
                    Movie ID
                  </label>
                  <input
                    className="form-control"
                    id="id"
                    name="id"
                    value={updatedMovie?.id}
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
                    value={updatedMovie?.title}
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
                    value={updatedMovie?.original_title}
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
                    value={updatedMovie?.release_date}
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
                    value={updatedMovie?.backdrop_path}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mt-3 col-md-3 form-group">
                  <label for="popularity" className="control-label">
                    Popularity
                  </label>
                  <input
                    disabled
                    className="form-control"
                    id="popularity"
                    name="popularity"
                    value={updatedMovie?.popularity}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-3 col-md-12 form-group">
                  <label for="video" className="control-label align-middle ">
                    Video
                    <input
                      type="checkbox"
                      checked={updatedMovie?.video}
                      className="ms-2"
                      id="video"
                      name="video"
                      // value={updatedMovie?.video}
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
                    value={updatedMovie?.poster_path}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mt-3 col-md-2 form-group">
                  <label for="vote_count" className="control-label">
                    Vote Count
                  </label>
                  <input
                    disabled
                    className="form-control"
                    id="vote_count"
                    name="vote_count"
                    value={updatedMovie?.vote_count}
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
                    value={updatedMovie?.original_language}
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
                    value={updatedMovie?.genre_ids}
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
                    value={updatedMovie?.overview}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <button
                className="btn btn-danger mt-3 me-2"
                onClick={handleSaveMovie}
              >
                {operation === "addMovie" ? "Add" : "Save"}
              </button>
              <button
                className="btn btn-warning text-white mt-3"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>

    // <div>

    //   <h3>Edit Movie</h3>
    //   <p>Title: {movie.title}</p>
    //   <button onClick={onClose}>Close</button>
    // </div>
  );
};

export default EditMovie;
