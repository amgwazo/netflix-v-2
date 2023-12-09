/*This Banner code created courtesy of Youtuber Sonny Sangha who I followed when implementing TMDB API integration */ 

import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "./Axios";
import requests from "./Requests";

const Banner = () => {
  // const apiURL = process.env.REACT_APP_TMDB_API_URL;
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]
      );
    };

    fetchData();
  }, []);

  console.log(movie);

  function truncate(str, n) {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  }
  return (
    <>
      <header
        style={{
          backgroundImage:
            `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path} ")`,
        }}
      >
        <div className="banner_contents">
          <h1 className="banner_title">{ movie?.title || movie?.name || movie?.originalName}</h1>
          <div className="banner_buttons">
            <button className="banner_button">Play</button>
            <button className="banner_button">My List</button>
          </div>
          <h5 className="banner_description">
            {truncate(
              movie?.overview,
              200
            )}
          </h5>
        </div>

        <div className="banner_fadeBottom" />
      </header>
    </>
  );
};

export default Banner;
