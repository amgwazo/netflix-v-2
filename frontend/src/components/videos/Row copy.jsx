import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "./Axios";

const Row = ({ title, fetchUrl, isLargeRow }) => {
//   const baseURL = process.env.REACT_APP_TMDB_IMAGES_API_ORIGINAL_END_POINT;
  const baseURL = process.env.REACT_APP_TMDB_IMAGES_API_END_POINT;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request.data.results;
    }

    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h4>{title}</h4>

      <div className="row_posters">
        {movies.map(
          (movie) =>
            
        /*  {
            if (
              (isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)
            ) {
              return (
                <img
                  className={`row_poster ${isLargeRow && "row_posterLarge"} `}
                  key={movie.id}
                  src={`${baseURL}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                />
              );
            } 

            return null;
          
              
          }
*/
          ((isLargeRow && movie.poster_path) ||
            (!isLargeRow && movie.backdrop_path)) && (
              <img
                className={`row_poster ${isLargeRow && "row_posterLarge"} `}
                key={movie.id}
                src={`${baseURL}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
              )
        )}
      </div>
    </div>
  );
};

export default Row;
