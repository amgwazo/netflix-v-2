import React, { useEffect, useState, useRef } from "react";
import Modal from "react-modal";
import "./Row.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

// import axios from "./Axios";

let apiURL = process.env.REACT_APP_BASE_URL_DEV;

if (process.env.NODE_ENV === "production") {
  apiURL = process.env.REACT_APP_BASE_URL_PROD;
}

const Row = ({ title, fetchUrl, isLargeRow, genre_id }) => {
  const movieRowRef = useRef(null);
  //   const baseURL = process.env.REACT_APP_TMDB_IMAGES_API_ORIGINAL_END_POINT;
  const baseURL = process.env.REACT_APP_TMDB_IMAGES_API_END_POINT;

  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch(`${apiURL}/filteredMovies`, {
      // fetch("http://localhost:3001/api/filteredMovies", {
      method: "POST",
      headers: {
        "x-access-token": sessionStorage.getItem("ltk"),
        body: { genre_id },
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.movies);
      });
  }, [genre_id]);


  const handleImageClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    setShowModal(false);
  };

  return (
    <div className="row">
      <h4>{title}</h4>

      <div className="arrow-buttons">
        <button
          className="arrow-button"
          onClick={() => (movieRowRef.current.scrollLeft -= 200)}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          {/* <i className="fa fa-chevron-left"></i> */}
        </button>

        <button
          className="arrow-button"
          onClick={() => (movieRowRef.current.scrollLeft += 200)}
        >
          {/* <i className="fa fa-chevron-right"></i> */}
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      {/* <button
        className="arrow-button"
        onClick={() => (movieRowRef.current.scrollLeft -= 200)}
      >
        <i className="fa fa-chevron-left"></i>
      </button> */}

      <div className="row_posters" ref={movieRowRef} id="movie-row">
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.poster_path)) && (
              <img
                className={`row_poster ${isLargeRow && "row_posterLarge"} `}
                key={movie.id}
                src={`${baseURL}${
                  isLargeRow ? movie.poster_path : movie.poster_path
                }`}
                alt={movie.title}
                onClick={() => handleImageClick(movie)}
              />
            )
        )}
      </div>

      {/* <button
        className="arrow-button"
        onClick={() => (movieRowRef.current.scrollLeft += 200)}
      >
        <i className="fa fa-chevron-right"></i>
      </button> */}

      {selectedMovie && (
        <Modal
          className="overlay content my-5 pb-5"
          isOpen={showModal}
          onRequestClose={handleCloseModal}
        >
          <div className="m-5">
            <button
              className="modal-btn mt-2 me-2 btn btn-sm btn-danger float-end fw-bold "
              onClick={handleCloseModal}
            >
              X
            </button>
          </div>
          <div className=" m-0">
            <img
              className="modal-img"
              src={`${baseURL}${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
            />
            <div className="modal-text">
              <h2>{selectedMovie.title}</h2>
              <p>{selectedMovie.overview}</p>
              <span>
                Release Date:{" "}
                {new Date(selectedMovie.release_date).toLocaleDateString(
                  "en-us",
                  {
                    // weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )}
              </span>
              <br />
              <span>Rating: {selectedMovie.vote_average}</span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Row;