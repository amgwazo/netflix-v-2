import React, { useEffect, useState, useRef } from "react";
import Modal from "react-modal";
import "./Search.css";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import searchImage from '../../images/search.png';
// import axios from "./Axios";

let apiURL = process.env.REACT_APP_BASE_URL_DEV;

if (process.env.NODE_ENV === "production") {
  apiURL = process.env.REACT_APP_BASE_URL_PROD;
}

const Search = ({ fetchUrl, isLargeRow }) => {
  const movieRowRef = useRef(null);
  const baseURL = process.env.REACT_APP_TMDB_IMAGES_API_END_POINT;

  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [genre, setGenres] = useState([]);

  const [movies, setMovies] = useState([]);
  // const [movieCount, setMovieCount] = useState(0);

  const [genre_id, setGenre_id] = useState("");
  const [title, setTitle] = useState("");
  const [searchHeader, setSearchHeader] = useState("");
  const [selectedOptionText, setSelectedOptionText] = useState("");
  //`Search Results for titles with the key word '${title}'.`

  const getFilteredMovies =  () => {
    const queryParams = new URLSearchParams({
      title,
      genre_id,
    });

    fetch(`${apiURL}/filteredMovies?${queryParams}`, {
      // fetch("http://localhost:3001/api/filteredMovies", {
      method: "GET",
      headers: {
        "x-access-token": sessionStorage.getItem("ltk"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.movies);
        // console.log(data.movies.length);
        console.log(`genre id is ${genre_id}`);
        // setMovieCount(data.movies.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // console.log("renderComponent");
    fetch(`${apiURL}/genre`, {
      method: "GET",
      headers: {
        "x-access-token": sessionStorage.getItem("ltk"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setGenres(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const renderGenre = (data) => {
    if (data) {
      return data.map((item) => {
        return (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        );
      });
    }
  };

    useEffect(() => {    
    // if(selectedOptionText)
    // { setSearchHeader(`Search Results for Category: ${selectedOptionText}`) ;}

    
    selectedOptionText && title &&
      setSearchHeader(`Search Results for keyword: ${title} under category : ${selectedOptionText}`);

    selectedOptionText &&
      !title &&
      setSearchHeader(`Search Results for Category: ${selectedOptionText}`);

      !selectedOptionText &&
        title &&
        setSearchHeader(`Search Results for keyword: ${title}`);

    getFilteredMovies();
  }, [genre_id, selectedOptionText, title]);


  const handleGenre =  (event) => {
    setGenre_id(event.target.value);
    setSelectedOptionText(
      event.target.options[event.target.selectedIndex].text
    );    
  };

    const handleTitle = (event) => {
      setTitle(event.target.value);     
      console.log(event.target.value);
    };
  const handleImageClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    setShowModal(false);
  };

  return (
    <>
      <div className="h-100 bg-black">
        <div className="nav-bar d-flex flex-column bg-black  ">
          <Navbar />
        </div>

        <div className="search">
          <div className="search-bar">
            <div className="dropdown">
              <select onChange={handleGenre}>
                <option>Genres</option>
                {renderGenre(genre)}
              </select>
            </div>

            <div className="w-75">
              <Link to="" className="image-button">
                <img src={searchImage} alt="Search" class="search-img" />
              </Link>

              <input
                name="searchInput"
                id="searchInput"
                onChange={handleTitle}
                type="text"
                value={title}
              ></input>
            </div>
          </div>

          <div className="results-panel">
            <div className="row mt-0">
              {movies ? (
                <>
                  <h5 className="mt-5">{searchHeader}</h5>

                  {/* <button
        className="arrow-button"
        onClick={() => (movieRowRef.current.scrollLeft -= 200)}
      >
        <i className="fa fa-chevron-left"></i>
      </button> */}

                  <div
                    className="row_search_posters"
                    ref={movieRowRef}
                    id="movie-row"
                  >
                    {movies
                      ? movies.map(
                          (movie) =>
                            ((isLargeRow && movie.poster_path) ||
                              (!isLargeRow && movie.poster_path)) && (
                              <img
                                className={`row_search_poster ${
                                  isLargeRow && "row_search_posterLarge"
                                } `}
                                key={movie.id}
                                src={`${baseURL}${
                                  isLargeRow
                                    ? movie.poster_path
                                    : movie.poster_path
                                }`}
                                alt={movie.title}
                                onClick={() => handleImageClick(movie)}
                              />
                            )
                        )
                      : null}
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
                            {new Date(
                              selectedMovie.release_date
                            ).toLocaleDateString("en-us", {
                              // weekday: "long",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <br />
                          <span>Rating: {selectedMovie.vote_average}</span>
                        </div>
                      </div>
                    </Modal>
                  )}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
