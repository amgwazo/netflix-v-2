import React, { useEffect, useState } from "react";
import DisplayMovieList from "./MovieList";

let apiURL = process.env.REACT_APP_BASE_URL_DEV;

if (process.env.NODE_ENV === "production") {
  apiURL = process.env.REACT_APP_BASE_URL_PROD;
}


const ViewMovie = () => {
  const [movies, setMovies] = useState();
  const [title, setTitle] = useState('');
   

  useEffect(() => {

   const queryParams = new URLSearchParams({
     title,
     itemsPerPage : 242
   });

    fetch(`${apiURL}/filteredMovies?${queryParams}`, {
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
  }, [title]);

  return (
    <>
      <div className=" h-100 bg-black">
        <div className="container pt-5">
          <div className="panel panel-info mt-5  movie-form">
            <hr />
            <div className="panel-heading">
              <h3 className="text-secondary">{''}</h3>
              <div className="vh-50">
                <>
                  <input
                  hidden
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Search by title"
                  />
                </>

                <DisplayMovieList movies={movies} setTitle={setTitle} title={title} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewMovie;
