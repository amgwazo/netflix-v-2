
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,

  //https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc

  //https://api.themoviedb.org/3/dsicover/movie?api_key=ba44d04c890090594748b0130d24cbf2&with_genres=35

  //https://api.themoviedb.org/3/discover/movie?api_key=ba44d04c890090594748b0130d24cbf2&with_genres=35
};

export default requests