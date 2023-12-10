// import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
// import {  useNavigate } from 'react-router-dom';
import Banner from '../components/videos/Banner';
import './Videos.css';
// import requests from '../components/videos/Requests';
import Row from '../components/videos/Row';



const Videos = () => {
  const fetchUrl = "/movies";
//  const isUserSignedIn = !!localStorage.getItem("token");
//  const navigate = useNavigate();

 // Redirect to login if user is not authenticated
//  if (!isUserSignedIn) {
//    navigate("/login");
//   //  return null; // Render nothing if redirecting
//  }

/* const tmdbUrl =
   process.env.REACT_APP_TMDB_API_END_POINT +
   "api_key=" +
   process.env.REACT_APP_TMDB_API_KEY;*/

//  const [movieList, setMovieList] = useState([]);

//   useEffect(() => {
//     const getMovie = () => {
//       fetch(tmdbUrl)
//         .then((res) => res.json())
//         .then((json) => setMovieList(json.results));
//     };
//     getMovie();
//   }, [tmdbUrl]);

  return (
    <>
      <div className="h-100 bg-black">
        <div className="nav-bar d-flex flex-column bg-black  ">
          <Navbar />
          {/* <hr /> */}
        </div>
        <Banner />

        <Row title="Netflix Originals" fetchUrl isLargeRow />

        <Row title="Trending Now" fetchUrl />

        <Row title="Action movies" fetchUrl genre_id="28" />

        <Row title="Action movies" fetchUrl genre_id="" />

        <Row title="Comedy Movies" fetchUrl genre_id="35" />

        <Row title="Horror Movies" fetchUrl genre_id="27" />

        <Row title="Romance Movies" fetchUrl genre_id="10749" />

        <Row title="Documentaries" fetchUrl genre_id="99" />

        {/* <div className="d-flex col justify-content-center flex-wrap bg-black">
          {movieList.map((movie) => (
            <img
              style={{
                maxWidth: "350px",
                maxHeight: "250px",
                marginLeft: "10px",
                marginTop: "10px",
              }}
             
              src={`${process.env.REACT_APP_TMDB_IMAGES_API_END_POINT}${movie.poster_path}`}
              alt="Movie Cover"
            />
          ))}
        </div> */}
      </div>
    </>
  );
}

export default Videos